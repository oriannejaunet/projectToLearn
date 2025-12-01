-- =========================
-- Clean existing tables
-- =========================
DROP TABLE IF EXISTS "include";
DROP TABLE IF EXISTS "coffee";
DROP TABLE IF EXISTS "country";
DROP TABLE IF EXISTS "characteristic";

-- =========================
-- TABLE : country
-- =========================
CREATE TABLE country (
    country_id INT PRIMARY KEY,
    name VARCHAR(42) NOT NULL
);

-- =========================
-- TABLE : characteristic
-- =========================
CREATE TABLE characteristic (
    characteristic_id INT PRIMARY KEY,
    name VARCHAR(42) NOT NULL
);

-- =========================
-- TABLE : coffee (ex "cofee")
-- =========================
CREATE TABLE coffee (
    reference INT PRIMARY KEY,
    name VARCHAR(42),
    description VARCHAR(255),
    price DECIMAL(10,2),
    available BOOLEAN,
    country_id INT NOT NULL,
    FOREIGN KEY (country_id) REFERENCES country(country_id)
);

-- =========================
-- TABLE : include (coffee <-> characteristic)
-- =========================
CREATE TABLE "include" (
    reference INT,
    characteristic_id INT,
    PRIMARY KEY (reference, characteristic_id),
    FOREIGN KEY (reference) REFERENCES coffee(reference),
    FOREIGN KEY (characteristic_id) REFERENCES characteristic(characteristic_id)
);

-- =========================
-- INSERT COUNTRIES
-- =========================
INSERT INTO country (country_id, name) VALUES
(1, 'Italie'),
(2, 'Colombie'),
(3, 'Éthiopie'),
(4, 'Brésil'),
(5, 'Guatemala'),
(6, 'Kenya'),
(7, 'Indonésie'),
(8, 'Costa Rica'),
(9, 'Vietnam'),
(10, 'Tanzanie'),
(11, 'Jamaïque'),
(12, 'Rwanda'),
(13, 'Panama'),
(14, 'Pérou'),
(15, 'Hawaï'),
(16, 'Nicaragua');

-- =========================
-- INSERT CHARACTERISTICS
-- =========================
INSERT INTO characteristic (characteristic_id, name) VALUES
(1, 'Corsé'),
(2, 'Épicé'),
(3, 'Acide'),
(4, 'Doux'),
(5, 'Fruité'),
(6, 'Chocolaté');

-- =========================
-- INSERT COFFEES
-- =========================
INSERT INTO coffee VALUES
(100955890, 'Espresso', 'Café fort et concentré préparé en faisant passer de l eau chaude à travers du café finement moulu.', 20.99, TRUE, 1),
(100955894, 'Columbian', 'Café moyennement corsé avec une acidité vive et une saveur riche.', 18.75, TRUE, 2),
(105589090, 'Ethiopian Yirgacheffe', 'Réputé pour son arôme floral, son acidité vive et ses notes citronnées.', 22.50, TRUE, 3),
(134009550, 'Brazilian Santos', 'Café doux et lisse avec un profil de saveur de noisette.', 17.80, TRUE, 4),
(256505890, 'Guatemalan Antigua', 'Café corsé avec des nuances chocolatées et une pointe d épice.', 21.25, TRUE, 5),
(295432730, 'Kenyan AA', 'Café complexe avec une acidité rappelant le vin et des saveurs fruitées.', 23.70, TRUE, 6),
(302932754, 'Sumatra Mandheling', 'Café profond et terreux avec un corps lourd et une faible acidité.', 19.95, TRUE, 7),
(327302954, 'Costa Rican Tarrazu', 'Café vif et net avec une acidité vive.', 24.50, TRUE, 8),
(549549090, 'Vietnamese Robusta', 'Café audacieux et fort avec une saveur robuste distinctive.', 16.75, TRUE, 9),
(582954954, 'Tanzanian Peaberry', 'Acidité vive avec un profil rappelant le vin et un corps moyen.', 26.80, TRUE, 10),
(589100954, 'Jamaican Blue Mountain', 'Saveur douce, acidité vive et aucune amertume.', 39.25, TRUE, 11),
(650753915, 'Rwandan Bourbon', 'Notes florales prononcées avec une acidité vive.', 21.90, TRUE, 12),
(795501340, 'Panamanian Geisha', 'Café rare aux arômes floraux complexes.', 42.00, TRUE, 13),
(954589100, 'Peruvian Arabica', 'Café équilibré avec des notes de chocolat et une acidité modérée.', 19.40, FALSE, 14),
(958090105, 'Hawaiian Kona', 'Café rare au goût riche et nuances subtiles.', 55.75, FALSE, 15),
(691550753, 'Nicaraguan Maragogipe', 'Notes de fruits avec une acidité vive et un corps plein.', 28.60, FALSE, 16);

-- =========================
-- INSERT RELATIONS (include)
-- =========================

-- Espresso : Corsé, Épicé
INSERT INTO "include" VALUES (100955890, 1);
INSERT INTO "include" VALUES (100955890, 2);

-- Columbian : Acide
INSERT INTO "include" VALUES (100955894, 3);

-- Ethiopian : Doux, Fruité
INSERT INTO "include" VALUES (105589090, 4);
INSERT INTO "include" VALUES (105589090, 5);

-- Brazilian : Doux
INSERT INTO "include" VALUES (134009550, 4);

-- Guatemalan : Corsé
INSERT INTO "include" VALUES (256505890, 1);

-- Kenyan : Doux, Acide
INSERT INTO "include" VALUES (295432730, 4);
INSERT INTO "include" VALUES (295432730, 3);

-- Sumatra : Corsé
INSERT INTO "include" VALUES (302932754, 1);

-- Costa Rica : Acide
INSERT INTO "include" VALUES (327302954, 3);

-- Vietnam : Épicé
INSERT INTO "include" VALUES (549549090, 2);

-- Tanzanian : Fruité, Corsé
INSERT INTO "include" VALUES (582954954, 5);
INSERT INTO "include" VALUES (582954954, 1);

-- Jamaican : Doux
INSERT INTO "include" VALUES (589100954, 4);

-- Rwandan : Fruité
INSERT INTO "include" VALUES (650753915, 5);

-- Panamanian : Fruité
INSERT INTO "include" VALUES (795501340, 5);

-- Peruvian : Corsé, Chocolaté
INSERT INTO "include" VALUES (954589100, 1);
INSERT INTO "include" VALUES (954589100, 6);

-- Hawaiian : Doux
INSERT INTO "include" VALUES (958090105, 4);

-- Nicaraguan : Corsé, Fruité
INSERT INTO "include" VALUES (691550753, 1);
INSERT INTO "include" VALUES (691550753, 5);
