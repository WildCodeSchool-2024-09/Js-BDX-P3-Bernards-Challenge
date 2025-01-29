-- SELECT 
--     JSON_ARRAYAGG(
--         JSON_OBJECT(
--             'enterpriseId', enterprise.id,
--             'enterpriseName', enterprise.name,
--             'channels', (
--                 SELECT JSON_ARRAYAGG(
--                     JSON_OBJECT(
--                         'channelSlackId', channel_slack.id,
--                         'channelSlackName', channel_slack.channel_name,
--                         'quizz', (
--                             SELECT JSON_ARRAYAGG(
--                                 JSON_OBJECT(
--                                     'quizzId', quizz.id,
--                                     'quizzName', quizz.name,
--                                     'questions', (
--                                         SELECT JSON_ARRAYAGG(
--                                             JSON_OBJECT(
--                                                 'questionId', question.id,
--                                                 'title', question.title,
--                                                 'lastResponse', (
--                                                     SELECT JSON_OBJECT(
--                                                         'date', latest_response.date,
--                                                         'responseMode', 
--                                                         CASE 
--                                                             WHEN latest_team_player.id IS NOT NULL THEN 'team'
--                                                             ELSE 'individual'
--                                                         END,
--                                                         'teamName', latest_team_player.name,
--                                                         'userId', latest_user.id,
--                                                         'userName', CONCAT(latest_user.first_name, ' ', latest_user.last_name),
--                                                         'responseType', combined_responses.type,
--                                                         'response', combined_responses.response
--                                                     )
--                                                     FROM response AS latest_response
--                                                     INNER JOIN (
--                                                         SELECT response_id, 'text' AS type, response FROM text_responses
--                                                         UNION ALL
--                                                         SELECT response_id, 'boolean' AS type, response FROM boolean_responses
--                                                         UNION ALL
--                                                         SELECT response_id, 'image' AS type, response FROM image_responses
--                                                     ) AS combined_responses ON combined_responses.response_id = latest_response.id
                                                    
--                                                     -- ⚡ INNER JOIN pour forcer la présence d'un joueur 
--                                                     INNER JOIN user_player AS latest_user_player 
--                                                         ON latest_user_player.response_id = latest_response.id
--                                                     INNER JOIN user AS latest_user 
--                                                         ON latest_user.id = latest_user_player.user_id
                                                    
--                                                     -- 🔄 Utilisation de LEFT JOIN ici pour inclure les réponses individuelles
--                                                     LEFT JOIN user_player_team_player AS latest_uptp 
--                                                         ON latest_uptp.user_player_id = latest_user_player.id
--                                                     LEFT JOIN team_player AS latest_team_player 
--                                                         ON latest_team_player.id = latest_uptp.team_player_id
                                                    
--                                                     WHERE latest_response.question_id = question.id
--                                                     AND latest_response.date = (
--                                                         SELECT MAX(response.date) 
--                                                         FROM response
--                                                         WHERE response.question_id = question.id
--                                                     )
--                                                 )
--                                             )
--                                         )
--                                         FROM question
--                                         WHERE question.quizz_id = quizz.id
--                                     )
--                                 )
--                             )
--                             FROM quizz
--                             INNER JOIN channel_slack_quizz ON channel_slack_quizz.quizz_id = quizz.id
--                             WHERE channel_slack_quizz.channel_slack_id = channel_slack.id
--                         )
--                     )
--                 )
--                 FROM channel_slack
--                 WHERE channel_slack.enterprise_id = enterprise.id
--             )
--         )
--     ) AS result
-- FROM enterprise;

SELECT 
    JSON_ARRAYAGG(
        JSON_OBJECT(
            'enterpriseId', enterprise.id,
            'enterpriseName', enterprise.name,
            'channels', COALESCE(channel_data.channels, JSON_ARRAY())
        )
    ) AS result
FROM enterprise
LEFT JOIN (
    SELECT 
        channel_slack.enterprise_id,
        JSON_ARRAYAGG(
            JSON_OBJECT(
                'channelSlackId', channel_slack.id,
                'channelSlackName', channel_slack.channel_name,
                'quizz', COALESCE(quizz_data.quizz, JSON_ARRAY())
            )
        ) AS channels
    FROM channel_slack
    LEFT JOIN (
        SELECT 
            channel_slack_quizz.channel_slack_id,
            JSON_ARRAYAGG(
                JSON_OBJECT(
                    'quizzId', quizz.id,
                    'quizzName', quizz.name,
                    'questions', COALESCE(question_data.questions, JSON_ARRAY())
                )
            ) AS quizz
        FROM quizz
        INNER JOIN channel_slack_quizz 
            ON channel_slack_quizz.quizz_id = quizz.id
        LEFT JOIN (
            SELECT 
                question.quizz_id,
                JSON_ARRAYAGG(
                    JSON_OBJECT(
                        'questionId', question.id,
                        'title', question.title,
                        'lastResponse', last_response_data.response
                    )
                ) AS questions
            FROM question
            LEFT JOIN (
                SELECT 
                    latest_response.question_id,
                    JSON_OBJECT(
                        'date', latest_response.date,
                        'responseMode', 
                        CASE 
                            WHEN latest_team_player.id IS NOT NULL THEN 'team'
                            ELSE 'individual'
                        END,
                        'teamName', latest_team_player.name,
                        'userId', latest_user.id,
                        'userName', CONCAT(latest_user.first_name, ' ', latest_user.last_name),
                        'responseType', combined_responses.type,
                        'response', combined_responses.response
                    ) AS response
                FROM response AS latest_response
                INNER JOIN (
                    SELECT question_id, MAX(date) AS max_date
                    FROM response
                    GROUP BY question_id
                ) AS latest_per_question
                ON latest_response.question_id = latest_per_question.question_id 
                AND latest_response.date = latest_per_question.max_date
                
                LEFT JOIN (
                    SELECT response_id, 'text' AS type, response FROM text_responses
                    UNION ALL
                    SELECT response_id, 'boolean' AS type, response FROM boolean_responses
                    UNION ALL
                    SELECT response_id, 'image' AS type, response FROM image_responses
                ) AS combined_responses ON combined_responses.response_id = latest_response.id
                
                LEFT JOIN user_player AS latest_user_player 
                    ON latest_user_player.response_id = latest_response.id
                LEFT JOIN user AS latest_user 
                    ON latest_user.id = latest_user_player.user_id
                LEFT JOIN user_player_team_player AS latest_uptp 
                    ON latest_uptp.user_player_id = latest_user_player.id
                LEFT JOIN team_player AS latest_team_player 
                    ON latest_team_player.id = latest_uptp.team_player_id
            ) AS last_response_data 
            ON last_response_data.question_id = question.id
            GROUP BY question.quizz_id
        ) AS question_data 
        ON question_data.quizz_id = quizz.id
        GROUP BY channel_slack_quizz.channel_slack_id
    ) AS quizz_data 
    ON quizz_data.channel_slack_id = channel_slack.id
    GROUP BY channel_slack.enterprise_id
) AS channel_data 
ON channel_data.enterprise_id = enterprise.id;

  