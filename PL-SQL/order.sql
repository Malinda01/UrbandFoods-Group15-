/* to view the logs of the db
CREATE TABLE debug_log (
    msg VARCHAR2(4000),
    log_time TIMESTAMP DEFAULT SYSTIMESTAMP
);

SELECT * FROM debug_log ORDER BY log_time DESC;

*/
--DROP PROCEDURE ADD_CUSTOMER;

CREATE OR REPLACE PROCEDURE ADD_CUSTOMER (
    p_name     IN VARCHAR2,
    p_phone    IN VARCHAR2,
    p_address  IN VARCHAR2,
    p_email    IN VARCHAR2,
    p_password IN VARCHAR2
) IS
    v_customer_id VARCHAR2(50);
BEGIN
    -- Step 1: Insert new customer (trigger assigns customer_id)
    INSERT INTO GRESHANNEW.CUSTOMER (
        CUS_NAME, CUS_PHONE, CUS_ADDRESS, CUS_EMAIL, CUS_PASSWORD
    )
    VALUES (
        p_name, p_phone, p_address, p_email, p_password
    );

    -- Step 2: Get the auto-generated customer_id using the email
    SELECT CUSTOMER_ID INTO v_customer_id
    FROM GRESHANNEW.CUSTOMER
    WHERE CUS_EMAIL = p_email;

    -- Step 3: Insert a cart for the new customer (trigger assigns cart_id)
    INSERT INTO GRESHANNEW.CART (
        STATUS, CUSTOMER_ID
    )
    VALUES (
        'inactive', v_customer_id
    );

    -- Step 4: Commit
    COMMIT;
EXCEPTION
    WHEN OTHERS THEN
        ROLLBACK;
        RAISE;
END ADD_CUSTOMER;
/
-------------------


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



---------------------------------------------------------------------------------------
-------------Create a PL/SQL procedure that fetches all products using a REF CURSOR:
---------------------------------------------------------------------------------------

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

-----------------------------------------------
-----Activates/creates a cart for a customer.
-----------------------------------------------

CREATE OR REPLACE PROCEDURE activate_cart(p_customer_id IN VARCHAR2) IS
BEGIN
    -- Update the existing cart's status to 'active'
    UPDATE GRESHANNEW.CART 
    SET STATUS = 'active'
    WHERE CUSTOMER_ID = p_customer_id;

    -- Optionally commit if not controlled by backend
    COMMIT;
EXCEPTION
    WHEN OTHERS THEN
        ROLLBACK;
        RAISE;
END activate_cart;
/



--DROP PROCEDURE activate_cart;
-------------------------------------------------
------------Adds product to CARTPRODUCT.
-------------------------------------------------

CREATE OR REPLACE PROCEDURE add_to_cart(
    p_customer_id IN VARCHAR2,
    p_product_id IN VARCHAR2,
    p_price IN NUMBER,
    p_quantity IN NUMBER
) IS
    v_cart_id VARCHAR2(50);
    v_quantity NUMBER;
BEGIN
    -- Get active cart
    SELECT cart_id INTO v_cart_id 
    FROM cart 
    WHERE customer_id = p_customer_id AND status = 'active';

    -- Check if product is already in cart
    SELECT quantity INTO v_quantity 
    FROM cartproduct 
    WHERE cart_id = v_cart_id AND product_id = p_product_id;

    -- Update quantity
    UPDATE cartproduct 
    SET quantity = quantity + p_quantity,
        price = p_price,
        added_at = SYSTIMESTAMP
    WHERE cart_id = v_cart_id AND product_id = p_product_id;

EXCEPTION
    WHEN NO_DATA_FOUND THEN
        -- Insert new cart item
        INSERT INTO cartproduct(cart_id, product_id, quantity, price, added_at)
        VALUES (v_cart_id, p_product_id, p_quantity, p_price, SYSTIMESTAMP);
END;
/

--delete cart--

CREATE OR REPLACE PROCEDURE delete_from_cart(
    p_customer_id IN VARCHAR2,
    p_product_id IN VARCHAR2
) IS
    v_cart_id VARCHAR2(50);
BEGIN
    SELECT cart_id INTO v_cart_id
    FROM cart
    WHERE customer_id = p_customer_id AND status = 'active';

    DELETE FROM cartproduct
    WHERE cart_id = v_cart_id AND product_id = p_product_id;
END;
/
---------------------------------
--- clear entire cart-------

CREATE OR REPLACE PROCEDURE clear_cart(
    p_customer_id IN VARCHAR2
) IS
    v_cart_id VARCHAR2(50);
BEGIN
    SELECT cart_id INTO v_cart_id
    FROM cart
    WHERE customer_id = p_customer_id AND status = 'active';

    DELETE FROM cartproduct
    WHERE cart_id = v_cart_id;
END;
/

-----------------------------

CREATE OR REPLACE PROCEDURE remove_from_cart(
    p_customer_id IN VARCHAR2,
    p_product_id IN VARCHAR2
) IS
    v_cart_id VARCHAR2(50);
    v_quantity NUMBER;
BEGIN
    SELECT cart_id INTO v_cart_id
    FROM cart
    WHERE customer_id = p_customer_id AND status = 'active';

    SELECT quantity INTO v_quantity
    FROM cartproduct
    WHERE cart_id = v_cart_id AND product_id = p_product_id;

    IF v_quantity > 1 THEN
        UPDATE cartproduct
        SET quantity = quantity - 1,
            added_at = SYSTIMESTAMP
        WHERE cart_id = v_cart_id AND product_id = p_product_id;
    ELSE
        DELETE FROM cartproduct
        WHERE cart_id = v_cart_id AND product_id = p_product_id;
    END IF;
END;
/



--DROP PROCEDURE add_to_cart;
------------------------------------------------------------------------
------------------Transfers cart data to ORDERPRODUCT.
------------------------------------------------------------------------
----------------------------------------------------------------------------------------
----------after the order id has cart id below changes are made
-----------------------------------------------------------------------------------------
-------------Moves items from cartproduct to orderproduct,Marks the cart inactive,Does not insert into the orders table,Returns order_id for confirmation modal

CREATE OR REPLACE PROCEDURE stash_order (
    p_customer_id IN VARCHAR2,
    p_order_id OUT VARCHAR2
) AS
    v_cart_id VARCHAR2(50);
    v_order_id VARCHAR2(50);
BEGIN
    v_order_id := 'ORD' || TO_CHAR(SYSDATE, 'YYMMDDHH24MISS') || LPAD(TRUNC(DBMS_RANDOM.VALUE(100, 999)), 3, '0');
    p_order_id := v_order_id;

    SELECT cart_id INTO v_cart_id 
    FROM cart 
    WHERE customer_id = p_customer_id AND status = 'active';

    FOR item IN (
        SELECT * FROM cartproduct WHERE cart_id = v_cart_id
    ) LOOP
        INSERT INTO orderproduct(order_id, product_id, quantity, price, total)
        VALUES (v_order_id, item.product_id, item.quantity, item.price, item.quantity * item.price);
    END LOOP;

    DELETE FROM cartproduct WHERE cart_id = v_cart_id;
    UPDATE cart SET status = 'inactive' WHERE cart_id = v_cart_id;
END;
/

-----------------------------------Inserts the final row into orders table (---------
DROP PROCEDURE confirm_order;

SET SERVEROUTPUT ON;

CREATE TABLE debug_log (
    id NUMBER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    msg VARCHAR2(4000),
    log_time TIMESTAMP DEFAULT SYSTIMESTAMP
);


CREATE OR REPLACE PROCEDURE confirm_order (
    p_order_id IN VARCHAR2,
    p_customer_id IN VARCHAR2,
    p_delivery_status in VARCHAR2
) AS
    v_total NUMBER := 0;
BEGIN
    SELECT SUM(total)
    INTO v_total
    FROM orderproduct
    WHERE order_id = p_order_id;

    INSERT INTO orders(order_id, customer_id, total_amount, order_date)
    VALUES (p_order_id, p_customer_id, v_total, SYSTIMESTAMP);
    
    INSERT INTO delivery(order_id, delivery_status)
    VALUES (p_order_id, p_delivery_status);
    
    --DBMS_OUTPUT.PUT_LINE('Order Inserted: ' || p_order_id || ' for customer ' || p_customer_id);
    INSERT INTO debug_log(msg) VALUES ('Order Inserted: ' || p_order_id || ' for customer ' || p_customer_id);

    
END;
/

ALTER TABLE Delivery
DROP COLUMN D_Person_ID;

