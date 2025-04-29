-- Run this before
SET SERVEROUTPUT ON;
BEGIN
    DBMS_OUTPUT.PUT_LINE('Hello, world!');
END;
/
-------------------------------------------------------------Supplier PL/SQL-------------------------------------------------------------------------------
-- 1. Register supplier 

CREATE OR REPLACE PROCEDURE add_new_sup (
    p_supplier_name VARCHAR2,
    p_email VARCHAR2,
    p_phone_number VARCHAR2,
    p_address VARCHAR2,
    p_pass VARCHAR2,
    p_supplier_type VARCHAR2
) AS
BEGIN
    INSERT INTO supplier (supplier_name, email, phone_number, address, pass, supplier_type)
    VALUES (p_supplier_name, p_email, p_phone_number, p_address, p_pass, p_supplier_type);
END;
/

-- Call the procedure
BEGIN
    add_new_sup('Supplier A', 'supplierA@example.com', '1234567890', '123 Street, City', 'securePass', 'Local');
END;
/

---------------------------------
-- 2. Login supplier
--Function
-- Function to check login credentials
CREATE OR REPLACE FUNCTION login_supp(
  p_email IN VARCHAR2,
  p_password IN VARCHAR2
) RETURN VARCHAR2
IS
  v_supplier_id supplier.supplier_id%TYPE;
BEGIN
  SELECT supplier_id
  INTO v_supplier_id
  FROM supplier
  WHERE email = p_email AND pass = p_password;

  RETURN v_supplier_id;

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
DECLARE
  v_id VARCHAR2(50);
BEGIN
  v_id := login_supp('jsonhatrick@gmail.com', 'hatr123');
  DBMS_OUTPUT.PUT_LINE('Supplier ID: ' || NVL(v_id, 'Login Failed'));
END;
/

---------------------------------
-- 3. Load Profile data
CREATE OR REPLACE PROCEDURE GET_SUPPLIER_DETAILS (
    p_supplier_id    IN  SUPPLIER.SUPPLIER_ID%TYPE,
    p_name           OUT SUPPLIER.SUPPLIER_NAME%TYPE,
    p_email          OUT SUPPLIER.EMAIL%TYPE,
    p_phone          OUT SUPPLIER.PHONE_NUMBER%TYPE,
    p_address        OUT SUPPLIER.ADDRESS%TYPE,
    p_pass           OUT SUPPLIER.PASS%TYPE,
    p_type           OUT SUPPLIER.SUPPLIER_TYPE%TYPE
)
IS
BEGIN
    SELECT SUPPLIER_NAME, EMAIL, PHONE_NUMBER, ADDRESS, PASS, SUPPLIER_TYPE
    INTO p_name, p_email, p_phone, p_address, p_pass, p_type
    FROM SUPPLIER
    WHERE SUPPLIER_ID = p_supplier_id;
END;
/

-- call profile data procedure
DECLARE
    v_name     SUPPLIER.SUPPLIER_NAME%TYPE;
    v_email    SUPPLIER.EMAIL%TYPE;
    v_phone    SUPPLIER.PHONE_NUMBER%TYPE;
    v_address  SUPPLIER.ADDRESS%TYPE;
    v_pass     SUPPLIER.PASS%TYPE;
    v_type     SUPPLIER.SUPPLIER_TYPE%TYPE;
BEGIN
    GET_SUPPLIER_DETAILS(
        p_supplier_id => 'sup006',
        p_name        => v_name,
        p_email       => v_email,
        p_phone       => v_phone,
        p_address     => v_address,
        p_pass        => v_pass,
        p_type        => v_type
    );

    DBMS_OUTPUT.PUT_LINE('Name: ' || v_name);
    DBMS_OUTPUT.PUT_LINE('Email: ' || v_email);
    DBMS_OUTPUT.PUT_LINE('Phone: ' || v_phone);
    DBMS_OUTPUT.PUT_LINE('Address: ' || v_address);
    DBMS_OUTPUT.PUT_LINE('Password: ' || v_pass);
    DBMS_OUTPUT.PUT_LINE('Type: ' || v_type);
END;

---------------------------------
-- 4. Upate supplier
 -- Procedure to update supplier details
CREATE OR REPLACE PROCEDURE update_supplier (
    p_supplier_id    IN VARCHAR2,
    p_supplier_name  IN VARCHAR2 DEFAULT NULL,
    p_email          IN VARCHAR2 DEFAULT NULL,
    p_phone_number   IN VARCHAR2 DEFAULT NULL,
    p_address        IN VARCHAR2 DEFAULT NULL,
    p_pass           IN VARCHAR2 DEFAULT NULL,
    p_supplier_type  IN VARCHAR2 DEFAULT NULL
) AS
BEGIN
    UPDATE supplier
    SET 
        supplier_name = NVL(p_supplier_name, supplier_name),
        email = NVL(p_email, email),
        phone_number = NVL(p_phone_number, phone_number),
        address = NVL(p_address, address),
        pass = NVL(p_pass, pass),
        supplier_type = NVL(p_supplier_type, supplier_type)
    WHERE supplier_id = p_supplier_id;
    
    COMMIT;
END update_supplier;
/

-- Calling
BEGIN
    update_supplier(
        p_supplier_id   => 'sup007', 
        p_supplier_name => 'Updated Supplier A', 
        p_email         => 'updatedA@example.com'
    );
END;
/
---------------------------------

