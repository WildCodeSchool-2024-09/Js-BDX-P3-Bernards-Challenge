-- Création de la base de données
CREATE DATABASE IF NOT EXISTS bernards_challenges;
USE bernards_challenges;

-- Table: user
CREATE TABLE user (
    id INT AUTO_INCREMENT PRIMARY KEY,
    mail VARCHAR(255) NOT NULL UNIQUE,
    created_date DATETIME NOT NULL,
    first_name VARCHAR(255)
);

-- Table: application_user
CREATE TABLE application_user (
    id INT AUTO_INCREMENT PRIMARY KEY,
    password VARCHAR(255) NOT NULL,
    user_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES user(id)
);

-- Table: administrateur
CREATE TABLE administrateur (
    id INT AUTO_INCREMENT PRIMARY KEY,
    application_user_id INT NOT NULL,
    FOREIGN KEY (application_user_id) REFERENCES application_user(id)
);

-- Table: manager
CREATE TABLE manager (
    id INT AUTO_INCREMENT PRIMARY KEY,
    application_user_id INT NOT NULL,
    entreprise_id INT NOT NULL,
    FOREIGN KEY (application_user_id) REFERENCES application_user(id),
    FOREIGN KEY (entreprise_id) REFERENCES entreprise(id)
);

-- Table: entreprise
CREATE TABLE entreprise (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    token_slack VARCHAR(255)
);

-- Table: channel_slack
CREATE TABLE channel_slack (
    id INT AUTO_INCREMENT PRIMARY KEY,
    channel_name VARCHAR(255) NOT NULL,
    channel_id VARCHAR(255) NOT NULL,
    entreprise_id INT NOT NULL,
    FOREIGN KEY (entreprise_id) REFERENCES entreprise(id)
);

-- Table: quizz
CREATE TABLE quizz (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    created_date DATETIME NOT NULL
);

-- Table: question
CREATE TABLE question (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL
);

-- Table: response
CREATE TABLE response (
    id INT AUTO_INCREMENT PRIMARY KEY,
    date DATETIME NOT NULL,
    question_id INT NOT NULL,
    FOREIGN KEY (question_id) REFERENCES question(id)
);

-- Table: boolean_responses
CREATE TABLE boolean_responses (
    id INT AUTO_INCREMENT PRIMARY KEY,
    response BOOLEAN NOT NULL,
    response_id INT NOT NULL,
    FOREIGN KEY (response_id) REFERENCES response(id)
);

-- Table: image_responses
CREATE TABLE image_responses (
    id INT AUTO_INCREMENT PRIMARY KEY,
    path VARCHAR(255) NOT NULL,
    response_id INT NOT NULL,
    FOREIGN KEY (response_id) REFERENCES response(id)
);

-- Table: textual_responses
CREATE TABLE textual_responses (
    id INT AUTO_INCREMENT PRIMARY KEY,
    response TEXT NOT NULL,
    response_id INT NOT NULL,
    FOREIGN KEY (response_id) REFERENCES response(id)
);

-- Table: user_player
CREATE TABLE user_player (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    response_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES user(id),
    FOREIGN KEY (response_id) REFERENCES response(id)
);

-- Table: team_player
CREATE TABLE team_player (
    id INT AUTO_INCREMENT PRIMARY KEY,
    quizz_id INT NOT NULL,
    name VARCHAR(255),
    FOREIGN KEY (quizz_id) REFERENCES quizz(id)
);

-- Table: user_player_team_player (relation N-N)
CREATE TABLE user_player_team_player (
    user_player_id INT NOT NULL,
    team_player_id INT NOT NULL,
    PRIMARY KEY (user_player_id, team_player_id),
    FOREIGN KEY (user_player_id) REFERENCES user_player(id),
    FOREIGN KEY (team_player_id) REFERENCES team_player(id)
);

-- Table: Asking (relation N-N)
CREATE TABLE Asking (
    quizz_id INT NOT NULL,
    question_id INT NOT NULL,
    PRIMARY KEY (quizz_id, question_id),
    FOREIGN KEY (quizz_id) REFERENCES quizz(id),
    FOREIGN KEY (question_id) REFERENCES question(id)
);

-- Table: Using (relation N-N)
CREATE TABLE Using (
    user_player_id INT NOT NULL,
    channel_slack_id INT NOT NULL,
    PRIMARY KEY (user_player_id, channel_slack_id),
    FOREIGN KEY (user_player_id) REFERENCES user_player(id),
    FOREIGN KEY (channel_slack_id) REFERENCES channel_slack(id)
);

-- Table: Having (relation N-N)
CREATE TABLE Having (
    channel_slack_id INT NOT NULL,
    quizz_id INT NOT NULL,
    PRIMARY KEY (channel_slack_id, quizz_id),
    FOREIGN KEY (channel_slack_id) REFERENCES channel_slack(id),
    FOREIGN KEY (quizz_id) REFERENCES quizz(id)
);

