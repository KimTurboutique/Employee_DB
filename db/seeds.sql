USE company_db;

INSERT INTO department(name)
VALUES ('Sales'),('Finance'),('IT'),('Legal');

INSERT INTO role(title, salary, department_id)
VALUES ('Legal Team Lead', 120000, 4), ('Lawyer', 275000, 4), ('Accountant', 100000, 2), ('Customer Service', 40000, 1), ('Sales Lead', 58000, 1), ('Salesperson', 50000, 1), ('Lead Engineer', 155000, );

INSERT INTO
    employee (
        first_name,
        last_name,
        role_id,
        manager_id
    )
VALUES ('Rachel', 'Green', 1, null), ('Gunther', 'Centralperk', 2, 1), ('Ross', 'Geller', 3, null), ('Joey', 'Tribbiani', 4, 3), ('Chandler', 'Bing', 5, null), ('Monica', 'Geller', 6, 5), ('Phoebe', 'Buffay', 7, null), ('Mike', 'Hannigan', 8, 7);