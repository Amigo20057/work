-- Таблица пользователей
CREATE TABLE users (
    id SERIAL PRIMARY KEY, -- Уникальный идентификатор пользователя
    user_name VARCHAR(255) NOT NULL, -- Полное имя пользователя
    user_surname VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE, -- Email (уникальный)
    password VARCHAR(255) NOT NULL, -- Хэш пароля
    roles VARCHAR(255) NOT NULL, -- Роли пользователя
    name_company VARCHAR(255) UNIQUE, -- Название компании (уникальное, если применимо)
    address_company VARCHAR(255) UNIQUE, -- Адрес компании (уникальное, если применимо)
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Дата создания записи
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP -- Дата обновления записи
);

-- Таблица постов
CREATE TABLE posts (
    id SERIAL PRIMARY KEY, -- Уникальный идентификатор поста
    title VARCHAR(255) NOT NULL, -- Название поста
    description TEXT NOT NULL, -- Описание поста
    tags VARCHAR(255), -- Теги поста (возможно, через запятую)
    recruiter_id INT REFERENCES users(id) ON DELETE CASCADE, -- Внешний ключ на таблицу users
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Дата создания записи
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP -- Дата обновления записи
);
