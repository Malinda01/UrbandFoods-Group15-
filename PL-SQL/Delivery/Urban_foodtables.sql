/*
-- 1. Supplier
-- Create the sequence
CREATE SEQUENCE supplier_seqnc
START WITH 1
INCREMENT BY 1
NOCACHE;

-- Create the table
CREATE TABLE Supplier (
    supplier_id VARCHAR2(10) PRIMARY KEY,
    supplier_name VARCHAR2(100) NOT NULL,
    email VARCHAR2(100),
    phone_number VARCHAR2(15),
    address VARCHAR2(255),
    pass VARCHAR2(255)
);

ALTER TABLE supplier ADD supplier_type VARCHAR2(50);


-- Auto increment pk
CREATE OR REPLACE TRIGGER trg_supplier_id
BEFORE INSERT ON Supplier
FOR EACH ROW
BEGIN
    :NEW.supplier_id := 'sup' || LPAD(supplier_seqnc.NEXTVAL, 3, '0');
END;

--------------------------------------------------------------------------------
-- 2. Customer
-- Create the sequence
CREATE SEQUENCE cust_seqnc
START WITH 1
INCREMENT BY 1
NOCACHE;

-- Create the table
CREATE TABLE Customer (
    customer_id   VARCHAR2(50) PRIMARY KEY,
    name          VARCHAR2(100) NOT NULL,
    cus_email         VARCHAR2(100) UNIQUE NOT NULL,
    cus_password      VARCHAR2(100) UNIQUE NOT NULL
);

-- Auto increment pk
CREATE OR REPLACE TRIGGER trg_customer_id
BEFORE INSERT ON Customer
FOR EACH ROW
BEGIN
    :NEW.customer_id := 'cus' || LPAD(cust_seqnc.NEXTVAL, 3, '0');
END;

--------------------------------------------------------------------------------
-- 3. Product
-- Create the sequence
CREATE SEQUENCE prod_seqnc
START WITH 1
INCREMENT BY 1
NOCACHE;

-- Create the table
CREATE TABLE Product (
    product_id   VARCHAR2(50) PRIMARY KEY,
    name         VARCHAR2(100) NOT NULL,
    price        NUMBER(10,2) NOT NULL,
    Quantity NUMBER(3),
    Category VARCHAR(15),
    Description VARCHAR(40),
    Img_URL VARCHAR(100),
    supplier_id  VARCHAR2(50)
);

-- Auto increment pk
CREATE OR REPLACE TRIGGER trg_product_id
BEFORE INSERT ON Product
FOR EACH ROW
BEGIN
    :NEW.product_id := 'prd' || LPAD(prod_seqnc.NEXTVAL, 3, '0');
END;

--------------------------------------------------------------------------------
-- 4. Cart
-- Create the sequence
CREATE SEQUENCE cart_seqnc
START WITH 1
INCREMENT BY 1
NOCACHE;

-- Create the table
CREATE TABLE Cart (
    cart_id VARCHAR2(50) PRIMARY KEY,
    status VARCHAR(20),
    customer_id  VARCHAR2(50) UNIQUE NOT NULL,
    CONSTRAINT fk_cart_customer FOREIGN KEY (customer_id) 
        REFERENCES CUSTOMER(customer_id) ON DELETE CASCADE
);

-- Auto increment pk
CREATE OR REPLACE TRIGGER trg_cart_id
BEFORE INSERT ON Cart
FOR EACH ROW
BEGIN
    :NEW.cart_id := 'crt' || LPAD(cart_seqnc.NEXTVAL, 3, '0');
END;

--------------------------------------------------------------------------------
-- 5. CARTPRODUCT
-- Create the table
CREATE TABLE CARTPRODUCT (
    cart_id     VARCHAR2(50),
    product_id  VARCHAR2(50),
    quantity    NUMBER(5) CHECK (quantity > 0),
    price       NUMBER(10,2) NOT NULL,
    added_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (cart_id, product_id),
    CONSTRAINT fk_cartproduct_cart FOREIGN KEY (cart_id) 
        REFERENCES CART(cart_id) ON DELETE CASCADE,
    CONSTRAINT fk_cartproduct_product FOREIGN KEY (product_id) 
        REFERENCES PRODUCT(product_id) ON DELETE CASCADE
);

--------------------------------------------------------------------------------
-- 6. ORDERS
-- Create the sequence
CREATE SEQUENCE order_seqnc
START WITH 1
INCREMENT BY 1
NOCACHE;

-- Create the table
CREATE TABLE ORDERS (
    order_id    VARCHAR2(50) PRIMARY KEY,
    customer_id VARCHAR2(50) NOT NULL,
    total_amount NUMBER(10,2) NOT NULL,
    order_date  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_order_customer FOREIGN KEY (customer_id) 
        REFERENCES CUSTOMER(customer_id) ON DELETE CASCADE
);

-- Auto increment pk
CREATE OR REPLACE TRIGGER trg_order_id
BEFORE INSERT ON ORDERS
FOR EACH ROW
BEGIN
    :NEW.order_id := 'crt' || LPAD(order_seqnc.NEXTVAL, 3, '0');
END;

--------------------------------------------------------------------------------
-- 7. Create ORDERPRODUCT
-- Create the table
CREATE TABLE ORDERPRODUCT (
    order_id   VARCHAR2(50),
    product_id VARCHAR2(50),
    quantity   NUMBER(5) CHECK (quantity > 0),
    price      NUMBER(10,2) NOT NULL,
    total      NUMBER(10,2) NOT NULL,
    PRIMARY KEY (order_id, product_id),
    CONSTRAINT fk_orderproduct_order FOREIGN KEY (order_id) 
        REFERENCES ORDERS(order_id) ON DELETE CASCADE,
    CONSTRAINT fk_orderproduct_product FOREIGN KEY (product_id) 
        REFERENCES PRODUCT(product_id) ON DELETE CASCADE
);

--------------------------------------------------------------------------------
-- 8. Payment
-- Create the sequence
CREATE SEQUENCE payemnt_seqnc
START WITH 1
INCREMENT BY 1
NOCACHE;

-- Create the table
CREATE TABLE PAYMENT (
    payment_id     VARCHAR2(50) PRIMARY KEY,
    order_id       VARCHAR2(50) UNIQUE NOT NULL,
    pay_method     VARCHAR2(50),
    status         VARCHAR2(20),
    payment_date   TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_payment_order FOREIGN KEY (order_id) 
        REFERENCES ORDERS(order_id) ON DELETE CASCADE,
    CONSTRAINT chk_pay_method CHECK (pay_method IN ('Credit Card', 'PayPal', 'Bank Transfer')),
    CONSTRAINT chk_status CHECK (status IN ('PENDING', 'SUCCESS', 'FAILED'))
);

-- Auto increment pk
CREATE OR REPLACE TRIGGER trg_payment_id
BEFORE INSERT ON PAYMENT
FOR EACH ROW
BEGIN
    :NEW.payment_id := 'pmt' || LPAD(payemnt_seqnc.NEXTVAL, 3, '0');
END;
*/
--------------------------------------------------------------------------------
-- 9. Delivery
-- Create the sequence
-- Sequence for DELIVERY_PERSON
CREATE SEQUENCE delivery_person_seq
START WITH 1
INCREMENT BY 1
NOCACHE;

CREATE TABLE DELIVERY_PERSON (
    D_Person_id     VARCHAR2(50) PRIMARY KEY,
    name            VARCHAR2(255) NOT NULL,
    email           VARCHAR2(100) UNIQUE NOT NULL,
    address         VARCHAR2(255),
    company_name    VARCHAR2(255),
    password        VARCHAR2(10)
);



-- Trigger to auto-generate D_Person_id
CREATE OR REPLACE TRIGGER trg_delivery_person_id
BEFORE INSERT ON DELIVERY_PERSON
FOR EACH ROW
BEGIN
    :NEW.D_Person_id := 'dp' || LPAD(delivery_person_seq.NEXTVAL, 3, '0');
END;



-- Sequence for DELIVERY
CREATE SEQUENCE delivery_seqnc
START WITH 1
INCREMENT BY 1
NOCACHE;


CREATE TABLE DELIVERY (
    delivery_id     VARCHAR2(50) PRIMARY KEY,
    order_id        VARCHAR2(50) UNIQUE NOT NULL,
    delivery_status VARCHAR2(50) DEFAULT 'Pending'
);



-- Trigger to auto-generate delivery_id
CREATE OR REPLACE TRIGGER trg_delivery_id
BEFORE INSERT ON DELIVERY
FOR EACH ROW
BEGIN
    :NEW.delivery_id := 'dlv' || LPAD(delivery_seqnc.NEXTVAL, 3, '0');
END;


--------------------------------------------------------------------------------

--Alter table statements
-- Product
ALTER TABLE Product ADD description VARCHAR2(255);

ALTER TABLE Product ADD quantity NUMBER(10);

ALTER TABLE Product ADD image_url VARCHAR2(255);

INSERT INTO Customer (name, cus_email, cus_password)
VALUES ('Perera', 'perera@example.com', 'password123');

SELECT * FROM Customer;


INSERT INTO ORDERS (customer_id, total_amount)
VALUES ('cus001', 100.50);

SELECT * FROM ORDERS;

SELECT * FROM DELIVERY_PERSON;

INSERT INTO DELIVERY (D_person_id, order_id)
VALUES ('dp001', 'crt002');

SELECT * FROM DELIVERY;

SELECT d.delivery_id, d.order_id, d.delivery_status, 
       dp.name AS delivery_person, o.order_date, o.total_amount
FROM delivery d
JOIN delivery_person dp ON d.d_person_id = dp.d_person_id
JOIN orders o ON d.order_id = o.order_id
WHERE d.order_id = 'crt003';

---------------------
INSERT INTO Customer (name, cus_email, cus_password)
VALUES ('Dula', 'dula@example.com', '2003');

INSERT INTO ORDERS (customer_id, total_amount)
VALUES ('cus003', 10000.00);

INSERT INTO DELIVERY (D_person_id, order_id)
VALUES ('dp009', 'crt004');