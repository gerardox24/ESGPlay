-- Created by Vertabelo (http://vertabelo.com)
-- Last modification date: 2018-10-16 00:31:42.579

-- tables
-- Table: Game
CREATE TABLE Game (
    id int  NOT NULL auto_increment,
    name nvarchar(50)  NOT NULL,
    CONSTRAINT Game_pk PRIMARY KEY  (id)
);

-- Table: Play
CREATE TABLE Play (
    id int  NOT NULL auto_increment,
    game_id int  NOT NULL,
    flag_victory int NULL,
    play_date datetime NULL,
    CONSTRAINT Play_pk PRIMARY KEY  (id)
);

-- Table: PlayDetails
CREATE TABLE PlayDetails (
    id int  NOT NULL auto_increment,
    user_id int  NOT NULL,
    play_id int  NOT NULL,
    flag_team int NULL,
    gpm int NULL,
    xpm int NULL,
    kills int NULL,
    deaths int NULL,
    assists int NULL,
    kda decimal(4,2) NULL,
    CONSTRAINT PlayDetails_pk PRIMARY KEY  (id)
);

-- Table: Team
CREATE TABLE Team (
    id int  NOT NULL auto_increment,
    name nvarchar(255)  NOT NULL,
    CONSTRAINT Team_pk PRIMARY KEY  (id)
);

-- Table: Tournament
CREATE TABLE Tournament (
    id int  NOT NULL auto_increment,
    name nvarchar(255)  NOT NULL,
    description text  NOT NULL,
    first_day date  NOT NULL,
    last_day date  NOT NULL,
    max_teams int  NOT NULL,
    url_to_image text  NOT NULL,
    CONSTRAINT Tournament_pk PRIMARY KEY  (id)
);

-- Table: TournamentPlay
CREATE TABLE TournamentPlay (
    id int NOT NULL auto_increment,
    tournament_id int  NOT NULL,
    play_id int  NOT NULL,
    scheduled date NULL,
    first_team_score int  NULL,
    second_team_score int  NULL,
    CONSTRAINT TournamentPlay_pk PRIMARY KEY  (id)
);

-- Table: User
CREATE TABLE User (
    id int  NOT NULL auto_increment,
    username nvarchar(255)  NOT NULL,
    email nvarchar(255) NULL,
    password nvarchar(255)  NOT NULL,
    phone nvarchar(255) NULL,
    steam_id int  NULL,
    steam_name nvarchar(255)  NULL,
    team_id int NULL,
    coach bit NULL,
    CONSTRAINT User_pk PRIMARY KEY  (id)
);

-- foreign keys
-- Reference: PlayDetails_Play (table: PlayDetails)
ALTER TABLE PlayDetails ADD CONSTRAINT PlayDetails_Play
    FOREIGN KEY (play_id)
    REFERENCES Play (id);

-- Reference: PlayDetails_User (table: PlayDetails)
ALTER TABLE PlayDetails ADD CONSTRAINT PlayDetails_User
    FOREIGN KEY (user_id)
    REFERENCES User (id);

-- Reference: Play_Game (table: Play)
ALTER TABLE Play ADD CONSTRAINT Play_Game
    FOREIGN KEY (game_id)
    REFERENCES Game (id);

-- Reference: TournamentPlay_Play (table: TournamentPlay)
ALTER TABLE TournamentPlay ADD CONSTRAINT TournamentPlay_Play
    FOREIGN KEY (play_id)
    REFERENCES Play (id);

-- Reference: TournamentPlay_Tournament (table: TournamentPlay)
ALTER TABLE TournamentPlay ADD CONSTRAINT TournamentPlay_Tournament
    FOREIGN KEY (tournament_id)
    REFERENCES Tournament (id);

-- Reference: User_Team (table: User)
ALTER TABLE User ADD CONSTRAINT User_Team
    FOREIGN KEY (team_id)
    REFERENCES Team (id);

-- End of file.