
CREATE DATABASE IF NOT EXISTS Bernards_Challenge ;

use Bernards_Challenge;
CREATE TABLE  user (
    id INT UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(255) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    last_name VARCHAR(150) NOT NULL,
    first_name VARCHAR(100),
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP   
);

-- Table: application_user
CREATE TABLE application_user (
    id INT UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT ,
    password VARCHAR(100) NOT NULL,
    user_id INT UNSIGNED NOT NULL, 
    FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE
);

CREATE TABLE administators (
  id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT ,
  application_user_id INT UNSIGNED NOT NULL,
 FOREIGN KEY (application_user_id) REFERENCES
  application_user(id) ON DELETE CASCADE
);

-- Table: enterprise
CREATE TABLE enterprise (
    id INT UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    token_slack VARCHAR(255)
);

-- Table: manager
CREATE TABLE manager (
    id INT UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
    application_user_id INT UNSIGNED NOT NULL,
    enterprise_id INT UNSIGNED NOT NULL,
    FOREIGN KEY (application_user_id) REFERENCES application_user(id) ON DELETE CASCADE ,
    FOREIGN KEY (enterprise_id) REFERENCES enterprise(id)
);

-- Table: channel_slack
CREATE TABLE channel_slack (
    id INT UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
    channel_name VARCHAR(255) NOT NULL,
    channel_id VARCHAR(255) NOT NULL,
    entreprise_id INT UNSIGNED NOT NULL,
    FOREIGN KEY (entreprise_id) REFERENCES enterprise(id) ON DELETE CASCADE
);

-- Table: question
CREATE TABLE question (
    id INT UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255)
);

-- Table: response
CREATE TABLE response (
    id INT UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
    date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    question_id INT UNSIGNED NOT NULL,
    FOREIGN KEY (question_id) REFERENCES question(id)
);

-- Table: user_player
CREATE TABLE user_player (
    id INT UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
    response_id INT UNSIGNED,
    user_id INT UNSIGNED,
    FOREIGN KEY (response_id) REFERENCES response(id),
    FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE
);

-- Table: channel_slack_user_player
CREATE TABLE channel_slack_user_player (
    user_player_id INT UNSIGNED NOT NULL,
    channel_slack_id INT UNSIGNED NOT NULL,
    FOREIGN KEY (user_player_id) REFERENCES user_player(id),
    FOREIGN KEY (channel_slack_id) REFERENCES channel_slack(id)
);

-- Table: quizz
CREATE TABLE quizz (
    id INT UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255),
    created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table: team_player
CREATE TABLE team_player (
    id INT UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    quizz_id INT UNSIGNED,
    FOREIGN KEY (quizz_id) REFERENCES quizz(id) ON DELETE CASCADE
);

-- Table: user_player_team_player
CREATE TABLE user_player_team_player (
    user_player_id INT UNSIGNED NOT NULL,
    team_player_id INT UNSIGNED NOT NULL,
    FOREIGN KEY (user_player_id) REFERENCES user_player(id) ON DELETE CASCADE,
    FOREIGN KEY (team_player_id) REFERENCES team_player(id)
);

-- Table: quizz_question
CREATE TABLE quizz_question (
    quizz_id INT UNSIGNED NOT NULL,
    question_id INT UNSIGNED NOT NULL,
    FOREIGN KEY (quizz_id) REFERENCES quizz(id),
    FOREIGN KEY (question_id) REFERENCES question(id) ON DELETE CASCADE
);

-- Table: channel_slack_quizz
CREATE TABLE channel_slack_quizz (
    channel_slack_id INT UNSIGNED NOT NULL,
    quizz_id INT UNSIGNED NOT NULL,
    FOREIGN KEY (channel_slack_id) REFERENCES channel_slack(id),
    FOREIGN KEY (quizz_id) REFERENCES quizz(id) ON DELETE CASCADE
);

-- Table: boolean_responses
CREATE TABLE boolean_responses (
    id INT UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
    response BOOLEAN NOT NULL,
    response_id INT UNSIGNED NOT NULL,
    FOREIGN KEY (response_id) REFERENCES response(id)
);

-- Table: image_responses
CREATE TABLE image_responses (
    id INT UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
    path VARCHAR(255) NOT NULL,
    response_id INT UNSIGNED NOT NULL,
    FOREIGN KEY (response_id) REFERENCES response(id)
);

-- Table: text_responses
CREATE TABLE text_responses (
    id INT UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
    response TEXT NOT NULL,
    response_id INT UNSIGNED NOT NULL,
    FOREIGN KEY (response_id) REFERENCES response(id)
);
