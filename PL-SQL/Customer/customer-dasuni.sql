--https://chatgpt.com/share/68021881-e29c-800d-aec5-05b5ebe48763
-- 1. Register Customer
CREATE OR REPLACE PROCEDURE ADD_CUSTOMER (
    p_name IN VARCHAR2,
    p_phone IN VARCHAR2,
    p_address IN VARCHAR2,
    p_email IN VARCHAR2,
    p_password IN VARCHAR2
) IS
BEGIN
    INSERT INTO GRESHANNEW.CUSTOMER (CUS_NAME, CUS_PHONE, CUS_ADDRESS, CUS_EMAIL, CUS_PASSWORD)
    VALUES (p_name, p_phone, p_address, p_email, p_password);
    
    COMMIT; -- To ensure data is committed to the database
EXCEPTION
    WHEN OTHERS THEN
        -- Handle exceptions (e.g., unique constraint violations)
        ROLLBACK;
        RAISE;
END ADD_CUSTOMER;

-- Calling
BEGIN
    ADD_CUSTOMER(
        p_name     => 'Malinda',
        p_phone    => '0771234567',
        p_address  => 'Colombo',
        p_email    => 'malinda@example.com',
        p_password => 'securepass123'
    );
END;


-------------------------------------

/*CREATE OR REPLACE PROCEDURE LOGIN_CUSTOMER (
    p_email IN VARCHAR2,
    p_password IN VARCHAR2,
    v_cursor OUT SYS_REFCURSOR
) IS
BEGIN
    OPEN v_cursor FOR
    SELECT CUSTOMER_ID, CUS_NAME, CUS_PHONE, CUS_ADDRESS, CUS_EMAIL
    FROM GRESHANNEW.CUSTOMER
    WHERE CUS_EMAIL = p_email
      AND CUS_PASSWORD = p_password;
END LOGIN_CUSTOMER;
/*/


---------------login---------------------------------

DROP PROCEDURE LOGIN_CUSTOMER;

DROP FUNCTION CHECK_CUSTOMER_LOGIN;

-- 2. Login Customer
CREATE OR REPLACE FUNCTION LOGIN_CUSTOMER (
    p_email IN VARCHAR2,
    p_password IN VARCHAR2
) RETURN NUMBER IS
    v_count NUMBER;
BEGIN
    -- Check if the email and password match a customer in the database
    SELECT COUNT(*) INTO v_count 
    FROM GRESHANNEW.CUSTOMER 
    WHERE CUS_EMAIL = p_email 
      AND CUS_PASSWORD = p_password;

    -- If a match is found, return 1, else return 0
    IF v_count > 0 THEN
        RETURN 1;
    ELSE
        RETURN 0;
    END IF;
END LOGIN_CUSTOMER;
/

-- Calling
DECLARE
    v_result NUMBER;
BEGIN
    v_result := LOGIN_CUSTOMER('malinda@example.com', 'securepass123');
    
    IF v_result = 1 THEN
        DBMS_OUTPUT.PUT_LINE('Login successful');
    ELSE
        DBMS_OUTPUT.PUT_LINE('Invalid credentials');
    END IF;
END;


----------------------update patch-------------
-- 3. Update Customer
CREATE OR REPLACE PROCEDURE UPDATE_CUSTOMER (
    p_customer_id IN VARCHAR2,
    p_name IN VARCHAR2 DEFAULT NULL,
    p_phone IN VARCHAR2 DEFAULT NULL,
    p_address IN VARCHAR2 DEFAULT NULL,
    p_email IN VARCHAR2 DEFAULT NULL,
    p_password IN VARCHAR2 DEFAULT NULL
) IS
BEGIN
    UPDATE GRESHANNEW.CUSTOMER
    SET 
        CUS_NAME = NVL(p_name, CUS_NAME),
        CUS_PHONE = NVL(p_phone, CUS_PHONE),
        CUS_ADDRESS = NVL(p_address, CUS_ADDRESS),
        CUS_EMAIL = NVL(p_email, CUS_EMAIL),
        CUS_PASSWORD = NVL(p_password, CUS_PASSWORD)
    WHERE CUSTOMER_ID = p_customer_id;

    COMMIT; -- Save changes
EXCEPTION
    WHEN OTHERS THEN
        ROLLBACK;
        RAISE;
END UPDATE_CUSTOMER;
/

-- Calling
BEGIN
    UPDATE_CUSTOMER(
        p_customer_id => 'cus002',
        p_name => 'John Doe',
        p_phone => '0771234567',
        p_address => '123 New Street',
        p_email => 'johndoe@email.com',
        p_password => 'newpass123'
    );
END;
/


-----------------------------------------------------
-------------Create a PL/SQL procedure that fetches all products using a REF CURSOR:

CREATE OR REPLACE PACKAGE product_pkg AS
  TYPE product_cursor IS REF CURSOR;
  PROCEDURE get_all_products(p_cursor OUT product_cursor);
END product_pkg;
/

CREATE OR REPLACE PACKAGE BODY product_pkg AS
  PROCEDURE get_all_products(p_cursor OUT product_cursor) IS
  BEGIN
    OPEN p_cursor FOR
      SELECT product_id, name, price, quantity, category, description, img_url, supplier_id
      FROM product;
  END get_all_products;
END product_pkg;
/

---------------------------------------
-----Activates/creates a cart for a customer.

CREATE OR REPLACE PROCEDURE activate_cart(p_customer_id IN VARCHAR2) AS
BEGIN
  MERGE INTO cart c
  USING (SELECT p_customer_id AS customer_id FROM dual) src
  ON (c.customer_id = src.customer_id)
  WHEN MATCHED THEN
    UPDATE SET c.status = 'active'
  WHEN NOT MATCHED THEN
    INSERT (cart_id, status, customer_id)
    VALUES (SYS_GUID(), 'active', p_customer_id);
END;
/


-------------------------------------------------
------------Adds product to CARTPRODUCT.
CREATE OR REPLACE PROCEDURE add_to_cart(
  p_customer_id IN VARCHAR2,
  p_product_id IN VARCHAR2,
  p_price       IN NUMBER
) AS
  v_cart_id VARCHAR2(50);
BEGIN
  SELECT cart_id INTO v_cart_id
  FROM cart
  WHERE customer_id = p_customer_id AND status = 'active';

  BEGIN
    -- If product already exists, increase quantity
    UPDATE cartproduct
    SET quantity = quantity + 1, price = price + p_price
    WHERE cart_id = v_cart_id AND product_id = p_product_id;

    IF SQL%ROWCOUNT = 0 THEN
      INSERT INTO cartproduct (cart_id, product_id, quantity, price)
      VALUES (v_cart_id, p_product_id, 1, p_price);
    END IF;
  END;
END;
/

--------------------------------------
------------------Transfers cart data to ORDERPRODUCT.
CREATE OR REPLACE PROCEDURE generate_order(
  p_customer_id IN VARCHAR2,
  p_order_id OUT VARCHAR2
) AS
  v_cart_id VARCHAR2(50);
BEGIN
  SELECT cart_id INTO v_cart_id
  FROM cart
  WHERE customer_id = p_customer_id AND status = 'active';

  p_order_id := 'ORD-' || TO_CHAR(SYSDATE, 'YYYYMMDDHH24MISS') || DBMS_RANDOM.VALUE(1000, 9999);

  INSERT INTO orderproduct (order_id, product_id, quantity, price, total)
  SELECT p_order_id, product_id, quantity, price, quantity * price
  FROM cartproduct
  WHERE cart_id = v_cart_id;
END;
/

----------------------------------
-----Moves order to orders, clears cartproduct, sets cart to inactive.
CREATE OR REPLACE PROCEDURE confirm_order(
  p_customer_id IN VARCHAR2,
  p_order_id    IN VARCHAR2
) AS
  v_total NUMBER(10,2);
BEGIN
  -- Calculate total from ORDERPRODUCT
  SELECT SUM(total) INTO v_total
  FROM orderproduct
  WHERE order_id = p_order_id;

  -- Insert into ORDERS table
  INSERT INTO orders (order_id, customer_id, total_amount, order_date)
  VALUES (p_order_id, p_customer_id, v_total, CURRENT_TIMESTAMP);

  -- Clear the cartproduct table
  DELETE FROM cartproduct
  WHERE cart_id = (
    SELECT cart_id FROM cart WHERE customer_id = p_customer_id
  );

  -- Set cart status to inactive
  UPDATE cart
  SET status = 'inactive'
  WHERE customer_id = p_customer_id;
END;
/



-----------------------------------------------
--------Rollback scenario
CREATE OR REPLACE PROCEDURE cancel_order(
  p_customer_id IN VARCHAR2
) AS
BEGIN
  DELETE FROM cartproduct
  WHERE cart_id = (SELECT cart_id FROM cart WHERE customer_id = p_customer_id);

  UPDATE cart
  SET status = 'inactive'
  WHERE customer_id = p_customer_id;
END;
/