-- create a tasks table with name, status being enum (completed, in progress), creation and update fields

CREATE TABLE tasks (
  id bigint not null AUTO_INCREMENT,
  task_name varchar(50) NOT NULL,
  task_status ENUM ('completed', 'in progress') NOT null DEFAULT 'in progress',
  created_at DATETIME,
  updated_at DATETIME, 
  PRIMARY KEY (id)
);

-- insert tasks into the table created above
INSERT INTO tasks (name, status, created_at, updated_at) VALUES ('Learn SQL', 'in progress', '2015-01-01 00:00:00', '2015-01-01 00:00:00');
INSERT INTO tasks (name, status, created_at, updated_at) VALUES ('Learn Ruby', 'in progress', '2015-01-01 00:00:00', '2015-01-01 00:00:00');
INSERT INTO tasks (name, status, created_at, updated_at) VALUES ('Learn JavaScript', 'in progress', '2015-01-01 00:00:00', '2015-01-01 00:00:00');
INSERT INTO tasks (name, status, created_at, updated_at) VALUES ('Learn PHP', 'in progress', '2015-01-01 00:00:00', '2015-01-01 00:00:00');
INSERT INTO tasks (name, status, created_at, updated_at) VALUES ('Learn Python', 'in progress', '2015-01-01 00:00:00', '2015-01-01 00:00:00');
