-- create table user (
--   id int unsigned primary key auto_increment not null,
--   email varchar(255) not null unique,
--   password varchar(255) not null
-- );

-- create table item (
--   id int unsigned primary key auto_increment not null,
--   title varchar(255) not null,
--   user_id int unsigned not null,
--   foreign key(user_id) references user(id)
-- );

-- insert into user(id, email, password)
-- values
--   (1, "jdoe@mail.com", "123456");

-- insert into item(id, title, user_id)
-- values
--   (1, "Stuff", 1),
--   (2, "Doodads", 1);

CREATE DATABASE Bernards_Challenge;

-- Table: application_user
CREATE TABLE application_user (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT UNSIGNED,
    password VARCHAR(60) NOT NULL,
    user_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES user(id)
);

-- Table: user
CREATE TABLE user (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT UNSIGNED,
    email VARCHAR(255) NOT NULL UNIQUE,
    created_at TIMESTAMP,
    last_name VARCHAR(150) NOT NULL,
    first_name VARCHAR(100),
    updated_at TIMESTAMP
);

CREATE TABLE administators (
  id INT PRIMARY KEY AUTO_INCREMENT unsigned,
  application_user_id FOREIGN KEY REFERENCES
  application_user(id)
)

-- Table: enterprise
CREATE TABLE enterprise (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT UNSIGNED,
    name VARCHAR(255) NOT NULL,
    token_slack VARCHAR(255)
);

-- Table: manager
CREATE TABLE manager (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT UNSIGNED,
    application_user_id INT NOT NULL,
    entreprise_id INT NOT NULL,
    FOREIGN KEY (application_user_id) REFERENCES application_user(id),
    FOREIGN KEY (entreprise_id) REFERENCES enterprise(id)
);

-- Table: channel_slack
CREATE TABLE channel_slack (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT UNSIGNED,
    channel_name VARCHAR(255),
    channel_id VARCHAR(255),
    entreprise_id INT NOT NULL,
    FOREIGN KEY (entreprise_id) REFERENCES enterprise(id)
);

-- Table: channel_slack_user_player
CREATE TABLE channel_slack_user_player (
    user_player_id INT NOT NULL,
    channel_slack_id INT NOT NULL,
    FOREIGN KEY (user_player_id) REFERENCES user_player(id),
    FOREIGN KEY (channel_slack_id) REFERENCES channel_slack(id)
);

-- Table: user_player
CREATE TABLE user_player (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT UNSIGNED,
    response_id INT,
    user_id INT,
    FOREIGN KEY (response_id) REFERENCES response(id),
    FOREIGN KEY (user_id) REFERENCES user(id)
);

-- Table: user_player_team_player
CREATE TABLE user_player_team_player (
    user_player_id INT NOT NULL,
    team_player_id INT NOT NULL,
    FOREIGN KEY (user_player_id) REFERENCES user_player(id),
    FOREIGN KEY (team_player_id) REFERENCES team_player(id)
);

-- Table: team_player
CREATE TABLE team_player (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT UNSIGNED,
    name VARCHAR(255) NOT NULL,
    quizz_id INT,
    FOREIGN KEY (quizz_id) REFERENCES quizz(id)
);

-- Table: response
CREATE TABLE response (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT UNSIGNED,
    date TIMESTAMP,
    question_id INT NOT NULL,
    FOREIGN KEY (question_id) REFERENCES question(id)
);

-- Table: question
CREATE TABLE question (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT UNSIGNED,
    title VARCHAR(255)
);

-- Table: quizz
CREATE TABLE quizz (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT UNSIGNED,
    name VARCHAR(255),
    created_date TIMESTAMP
);

-- Table: quizz_question
CREATE TABLE quizz_question (
    quizz_id INT NOT NULL,
    question_id INT NOT NULL,
    FOREIGN KEY (quizz_id) REFERENCES quizz(id),
    FOREIGN KEY (question_id) REFERENCES question(id)
);

-- Table: channel_slack_quizz
CREATE TABLE channel_slack_quizz (
    channel_slack_id INT NOT NULL,
    quizz_id INT NOT NULL,
    FOREIGN KEY (channel_slack_id) REFERENCES channel_slack(id),
    FOREIGN KEY (quizz_id) REFERENCES quizz(id)
);

-- Table: boolean_responses
CREATE TABLE boolean_responses (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT UNSIGNED,
    response BOOLEAN,
    response_id INT NOT NULL,
    FOREIGN KEY (response_id) REFERENCES response(id)
);

-- Table: image_responses
CREATE TABLE image_responses (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT UNSIGNED,
    path VARCHAR(255),
    response_id INT NOT NULL,
    FOREIGN KEY (response_id) REFERENCES response(id)
);

-- Table: text_responses
CREATE TABLE text_responses (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT UNSIGNED,
    response TEXT,
    response_id INT NOT NULL,
    FOREIGN KEY (response_id) REFERENCES response(id)
);

