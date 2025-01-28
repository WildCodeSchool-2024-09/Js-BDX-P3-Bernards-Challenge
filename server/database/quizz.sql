SELECT 
        quizz.id as quizzId, 
        quizz.name as quizzName,
        JSON_ARRAYAGG(
          JSON_OBJECT(
            enterprise.id as enterpriseId,
            enterprise.name as enterpriseName,
              JSON_ARRAYAGG(
                JSON_OBJECT(
                  question.id as questionId, 
                  title,
                  JSON_ARRAYAGG(
                    JSON_OBJECT(
                      date, 
                      response
                    )
                  ) as responses
                )
              ) as questions,

      FROM quizz
      INNER JOIN quizz_question ON quizz_question.question_id = quizz.id
      INNER JOIN question ON quizz_question.question_id = question.id
      INNER JOIN response ON response.question_id = question.id
      INNER JOIN boolean_responses ON boolean_responses.response_id = response.id
      INNER JOIN image_responses ON imgage_responses.response_id = response.id
      INNER JOIN text_responses ON text_responses.response_id = response.id
      INNER JOIN channel_slack_quizz ON channel_slack_quizz.quizz_id = quizz.id
      INNER JOIN channel_slack ON channel_slack.id = channel_slack_quizz.channel_slack_id     