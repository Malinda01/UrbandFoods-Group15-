-- 1. Register Delivery person 

CREATE OR REPLACE PROCEDURE add_new_D_person (
    p_name VARCHAR2,
    p_email VARCHAR2,
    p_address VARCHAR2,
    p_company_name VARCHAR2,
    p_password VARCHAR2
    
) AS
BEGIN
    INSERT INTO DELIVERY_PERSON (name, email, address, company_name, password)
    VALUES (p_name, p_email, p_address, p_company_name, p_password);
END;
/




-- Call the procedure
BEGIN
    add_new_D_person('D_person A', 'DA@example.com', '123 Street, City', 'ABC.pvt', 'securePass');
END;
/

 -------------------------------------------------------------------------------
 -- 2. Login delevery person
--Function
-- Function to check login credentials
CREATE OR REPLACE FUNCTION login_D_person(
  p_email IN VARCHAR2,
  p_password IN VARCHAR2
) RETURN VARCHAR2
IS
  v_D_Person_id DELIVERY_PERSON.D_Person_id%TYPE;
BEGIN
  SELECT D_Person_id
  INTO v_D_Person_id
  FROM DELIVERY_PERSON
  WHERE email = p_email AND password = p_password;

  RETURN v_D_Person_id;

EXCEPTION
  WHEN NO_DATA_FOUND THEN
    DBMS_OUTPUT.PUT_LINE('Invalid email or password.');
    RETURN NULL;
  WHEN OTHERS THEN
    DBMS_OUTPUT.PUT_LINE('An unexpected error occurred: ' || SQLERRM);
    RETURN NULL;
END;
/

-- Function call
-- Run this before
SET SERVEROUTPUT ON;
BEGIN
    DBMS_OUTPUT.PUT_LINE('Hello, world!');
END;
/

------------------------------------------
DECLARE
  v_id VARCHAR2(50);
BEGIN
  v_id := login_D_person('DA@example.com', 'securePass');
  DBMS_OUTPUT.PUT_LINE('D_Person_id: ' || NVL(v_id, 'Login Failed'));
END;
/

--------------------------------------------------------------------------------
-- Load Profile data
CREATE OR REPLACE PROCEDURE GET_D_PERSON_DETAILS (
    p_D_Person_id   IN  DELIVERY_PERSON.D_Person_id%TYPE,
    p_name           OUT DELIVERY_PERSON.NAME%TYPE,
    p_email          OUT DELIVERY_PERSON.EMAIL%TYPE,
    p_address        OUT DELIVERY_PERSON.ADDRESS%TYPE,
    p_company_name   OUT DELIVERY_PERSON.COMPANY_NAME%TYPE,
    p_password       OUT DELIVERY_PERSON.PASSWORD%TYPE  
)
IS
BEGIN
    SELECT NAME, EMAIL, ADDRESS, COMPANY_NAME, PASSWORD
    INTO p_name, p_email, p_address,p_company_name, p_password
    FROM DELIVERY_PERSON
    WHERE D_Person_id = p_D_Person_id;
    
    EXCEPTION
    WHEN NO_DATA_FOUND THEN
        DBMS_OUTPUT.PUT_LINE('No data found for the given D_Person_id.');
END;
/

-- call profile data procedure
DECLARE
    v_name     DELIVERY_PERSON.NAME%TYPE;
    v_email    DELIVERY_PERSON.EMAIL%TYPE;
    v_address  DELIVERY_PERSON.ADDRESS%TYPE;
    v_company_name  DELIVERY_PERSON.COMPANY_NAME%TYPE;
    v_password     DELIVERY_PERSON.PASSWORD%TYPE;
    
BEGIN
    GET_D_PERSON_DETAILS(
        p_D_Person_id => 'D006',
        p_name        => v_name,
        p_email       => v_email,
        p_address     => v_address,
        p_company_name  => v_company_name,
        p_password        => v_password
        
    );

    DBMS_OUTPUT.PUT_LINE('Name: ' || v_name);
    DBMS_OUTPUT.PUT_LINE('Email: ' || v_email);
    DBMS_OUTPUT.PUT_LINE('Address: ' || v_address);
    DBMS_OUTPUT.PUT_LINE('Company Name: ' || v_company_name);
    DBMS_OUTPUT.PUT_LINE('Password: ' || v_password);
    
    
    
END;

--------------------------------------------------------------------------------
 -- 3. Update Delivery person
 -- Procedure to update D person details
CREATE OR REPLACE PROCEDURE update_D_person (
    p_D_Person_id    IN VARCHAR2,
    p_name  IN VARCHAR2 DEFAULT NULL,
    p_email          IN VARCHAR2 DEFAULT NULL,
    p_address        IN VARCHAR2 DEFAULT NULL,
    p_company_name  IN VARCHAR2 DEFAULT NULL,
    p_password           IN VARCHAR2 DEFAULT NULL
    
) AS
BEGIN
    UPDATE DELIVERY_PERSON
    SET 
        name = NVL(p_name, name),
        email = NVL(p_email, email),
        address = NVL(p_address, address),
        company_name = NVL(p_company_name, company_name),
        password = NVL(p_password, password)
        
    WHERE D_Person_id  = p_D_Person_id ;
    
    COMMIT;
END update_D_person;
/

BEGIN
    update_D_person(
        p_D_Person_id   => 'D007', 
        p_name => 'Updated D_person A', 
        p_email         => 'updatedA@example.com'
    );
END;
/

BEGIN
  update_D_person('dp001', 'Felix', 'felix@example.com', 'Colombo', 'SSC.PVT.LTD', '234');
END;


--------------------------------------------------------------------------------
-- 4. Procedure to delete a account by product_id
CREATE OR REPLACE PROCEDURE Delete_D_person(
    p_D_Person_id IN VARCHAR2
) AS
BEGIN
    DELETE FROM DELIVERY_PERSON WHERE D_Person_id = p_D_Person_id;
    
    COMMIT;
END;
/

BEGIN
    Delete_D_person('D001');
END;
/

select * from DELIVERY_PERSON;

---------------------------------------------------------
-- 5. View Delivery details
CREATE OR REPLACE PROCEDURE view_delivery_details (
    p_order_id IN VARCHAR2
)
IS
BEGIN
    FOR rec IN (
        SELECT 
            d.delivery_id,
            d.order_id,
            d.delivery_status,
            dp.name AS delivery_person,
            o.order_date,
            o.total_amount
        FROM delivery d
        JOIN delivery_person dp ON d.d_person_id = dp.d_person_id
        JOIN orders o ON d.order_id = o.order_id
        WHERE d.order_id = p_order_id
    )
    LOOP
        DBMS_OUTPUT.PUT_LINE('Delivery ID: ' || rec.delivery_id);
        DBMS_OUTPUT.PUT_LINE('Order ID: ' || rec.order_id);
        DBMS_OUTPUT.PUT_LINE('Delivery Status: ' || rec.delivery_status);
        DBMS_OUTPUT.PUT_LINE('Delivery Person: ' || rec.delivery_person);
        DBMS_OUTPUT.PUT_LINE('Order Date: ' || TO_CHAR(rec.order_date, 'YYYY-MM-DD HH24:MI:SS'));
        DBMS_OUTPUT.PUT_LINE('Total Amount: ' || rec.total_amount);
        DBMS_OUTPUT.PUT_LINE('---------------------------');
    END LOOP;
END;

-- 6. Update delivey status
CREATE OR REPLACE PROCEDURE update_delivery_status (
    p_order_id IN VARCHAR2,
    p_new_status IN VARCHAR2
)
IS
BEGIN
    UPDATE delivery
    SET delivery_status = p_new_status
    WHERE order_id = p_order_id;

    IF SQL%ROWCOUNT = 0 THEN
        DBMS_OUTPUT.PUT_LINE('No delivery found for order ID: ' || p_order_id);
    ELSE
        DBMS_OUTPUT.PUT_LINE('Delivery status updated for order ID: ' || p_order_id);
    END IF;
END;

BEGIN
    view_delivery_details('crt002'); -- Replace 'crt001' with a valid order_id
END;

BEGIN
    update_delivery_status('crt002', 'Completed'); -- Replace with real order_id and desired status
END;

-- 7. Get all delviery details
CREATE OR REPLACE PROCEDURE get_all_delivery_details (
    p_cursor OUT SYS_REFCURSOR
)
IS
BEGIN
    OPEN p_cursor FOR
        SELECT 
            d.delivery_id,
            d.order_id,
            d.delivery_status,
            dp.name AS delivery_person,
            o.order_date,
            o.total_amount
        FROM delivery d
        JOIN delivery_person dp ON d.d_person_id = dp.d_person_id
        JOIN orders o ON d.order_id = o.order_id;
END;

-- Update delivery sttus
CREATE OR REPLACE PROCEDURE update_delivery_status (
    p_order_id IN VARCHAR2,
    p_new_status IN VARCHAR2
)
IS
BEGIN
    UPDATE delivery
    SET delivery_status = p_new_status
    WHERE order_id = p_order_id;

    IF SQL%ROWCOUNT = 0 THEN
        DBMS_OUTPUT.PUT_LINE('No delivery found for order ID: ' || p_order_id);
    ELSE
        DBMS_OUTPUT.PUT_LINE('Delivery status updated for order ID: ' || p_order_id);
    END IF;
END;
