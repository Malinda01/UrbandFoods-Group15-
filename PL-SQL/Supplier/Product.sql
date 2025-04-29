
-- Run this before
SET SERVEROUTPUT ON;
BEGIN
    DBMS_OUTPUT.PUT_LINE('Hello, world!');
END;
/
-------------------------------------------------------------Product PL/SQL-------------------------------------------------------------------------------
-- 1. Add product procedure

CREATE OR REPLACE PROCEDURE add_product (
    p_name          IN VARCHAR2,
    p_price         IN NUMBER,
    p_quantity      IN NUMBER,
    p_category      IN VARCHAR2,
    p_description   IN VARCHAR2,
    p_img_url       IN VARCHAR2,
    p_supplier_id   IN VARCHAR2
) AS
BEGIN
    INSERT INTO Product (
         name, price, quantity, category, description, img_url, supplier_id
    ) VALUES (
         p_name, p_price, p_quantity, p_category, p_description, p_img_url, p_supplier_id
    );
END;

-- Calling
BEGIN
    add_product(
        'Mango',
        120.00,
        10,
        'Fruit',
        'High-performance Mango',
        'https://example.com/images/laptop.jpg',
        'S001'
    );
END;

---------------------------------
-- 2. Populate the product form
CREATE OR REPLACE PROCEDURE get_product_by_id (
    p_product_id   IN  VARCHAR2,
    p_name         OUT VARCHAR2,
    p_price        OUT NUMBER,
    p_quantity     OUT NUMBER,
    p_category     OUT VARCHAR2,
    p_description  OUT VARCHAR2,
    p_img_url      OUT VARCHAR2,
    p_supplier_id  OUT VARCHAR2
) AS
BEGIN
    SELECT name, price, quantity, category, description, img_url, supplier_id
    INTO   p_name, p_price, p_quantity, p_category, p_description, p_img_url, p_supplier_id
    FROM   Product
    WHERE  product_id = p_product_id;
    
EXCEPTION
    WHEN NO_DATA_FOUND THEN
        p_name := NULL;
        p_price := NULL;
        p_quantity := NULL;
        p_category := NULL;
        p_description := NULL;
        p_img_url := NULL;
        p_supplier_id := NULL;
        
    WHEN OTHERS THEN
        DBMS_OUTPUT.PUT_LINE('Error: ' || SQLERRM);
END;
/

-- Calling
DECLARE
    v_name         VARCHAR2(100);
    v_price        NUMBER(10,2);
    v_quantity     NUMBER(3);
    v_category     VARCHAR2(15);
    v_description  VARCHAR2(40);
    v_img_url      VARCHAR2(100);
    v_supplier_id  VARCHAR2(50);
BEGIN
    get_product_by_id(
        p_product_id => 'prd010',
        p_name => v_name,
        p_price => v_price,
        p_quantity => v_quantity,
        p_category => v_category,
        p_description => v_description,
        p_img_url => v_img_url,
        p_supplier_id => v_supplier_id
    );

    DBMS_OUTPUT.PUT_LINE('Name: ' || v_name);
    DBMS_OUTPUT.PUT_LINE('Price: ' || v_price);
    DBMS_OUTPUT.PUT_LINE('Quantity: ' || v_quantity);
    DBMS_OUTPUT.PUT_LINE('Category: ' || v_category);
    DBMS_OUTPUT.PUT_LINE('Description: ' || v_description);
    DBMS_OUTPUT.PUT_LINE('Image URL: ' || v_img_url);
    DBMS_OUTPUT.PUT_LINE('Supplier ID: ' || v_supplier_id);
END;
/

---------------------------------
-- 3. Update product procedure

CREATE OR REPLACE PROCEDURE update_product (
    p_product_id     IN VARCHAR2,
    p_product_name   IN VARCHAR2,
    p_price          IN NUMBER,
    p_quantity       IN NUMBER,
    p_category       IN VARCHAR2,
    p_description    IN VARCHAR2,
    p_image_url      IN VARCHAR2,
    p_supplier_id    IN VARCHAR2
) AS
BEGIN
    UPDATE Product
    SET name        = p_product_name,
        price       = p_price,
        quantity    = p_quantity,
        category    = p_category,
        description = p_description,
        img_url     = p_image_url
    WHERE product_id = p_product_id
      AND supplier_id = p_supplier_id;
END;
/

-- Calling
BEGIN
    update_product(
        p_product_id   => 'prd010',
        p_product_name => 'Imported Apple',
        p_price        => 199.99,
        p_quantity     => 50,
        p_category     => 'Electronics',
        p_description  => 'Updated description.',
        p_image_url    => 'https://example.com/image.jpg',
        p_supplier_id  => 'sup011'
    );
END;
/

---------------------------------
-- 4. Get products by the supplier ID
CREATE OR REPLACE PROCEDURE get_products_by_supplier (
    p_supplier_id IN VARCHAR2,
    p_products OUT SYS_REFCURSOR
)
AS
BEGIN
    OPEN p_products FOR
        SELECT * FROM PRODUCT
        WHERE SUPPLIER_ID = p_supplier_id;
END;

---------------------------------
-- 5. Delete product procedure
CREATE OR REPLACE PROCEDURE delete_product (
    p_product_id IN VARCHAR2
) AS
BEGIN
    DELETE FROM PRODUCT
    WHERE product_id = p_product_id;
END;
/