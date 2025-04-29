SET SERVEROUTPUT ON;

-- 1. Total sales
CREATE OR REPLACE PROCEDURE get_supplier_sales_in_period(
    p_supplier_id IN VARCHAR2,
    p_start_date IN DATE,
    p_end_date IN DATE,
    p_total_sales OUT NUMBER
) IS
BEGIN
    SELECT SUM(op.total)
    INTO p_total_sales
    FROM orderproduct op
    JOIN product p ON op.product_id = p.product_id
    JOIN orders o ON op.order_id = o.order_id
    WHERE p.supplier_id = p_supplier_id
      AND o.order_date BETWEEN p_start_date AND p_end_date;

    -- If no sales found, set to 0
    IF p_total_sales IS NULL THEN
        p_total_sales := 0;
    END IF;

    -- Output (optional)
    DBMS_OUTPUT.PUT_LINE('Supplier ID: ' || p_supplier_id ||
                         ' | Total Sales from ' || TO_CHAR(p_start_date, 'YYYY-MM-DD') ||
                         ' to ' || TO_CHAR(p_end_date, 'YYYY-MM-DD') || 
                         ' = ' || p_total_sales);
EXCEPTION
    WHEN NO_DATA_FOUND THEN
        p_total_sales := 0;
        DBMS_OUTPUT.PUT_LINE('No sales found for Supplier ID: ' || p_supplier_id);
    WHEN OTHERS THEN
        DBMS_OUTPUT.PUT_LINE('Error: ' || SQLERRM);
        p_total_sales := 0;
END get_supplier_sales_in_period;
/
-- calling
DECLARE
    total_sales NUMBER;
BEGIN
    -- For Supplier sup002
    get_supplier_sales_in_period('sup011',
        TO_DATE('2025-04-01', 'YYYY-MM-DD'),
        TO_DATE('2025-04-18 23:59:59', 'YYYY-MM-DD HH24:MI:SS'),
        total_sales);

    -- For Supplier sup011
    get_supplier_sales_in_period('sup003',
        TO_DATE('2025-04-01', 'YYYY-MM-DD'),
        TO_DATE('2025-04-18 23:59:59', 'YYYY-MM-DD HH24:MI:SS'),
        total_sales);
END;
/

-------------------------------------------------------------
--2. Highest demanding product
CREATE OR REPLACE PROCEDURE get_high_demand_products(
    p_supplier_id IN VARCHAR2,
    p_result OUT SYS_REFCURSOR
)
IS
    max_quantity NUMBER := 0;
BEGIN
    -- Step 1: Find the maximum quantity sold
    SELECT MAX(total_quantity)
    INTO max_quantity
    FROM (
        SELECT SUM(op.quantity) AS total_quantity
        FROM product p
        JOIN orderproduct op ON p.product_id = op.product_id
        WHERE p.supplier_id = p_supplier_id
        GROUP BY p.product_id
    );

    -- Step 2: Return the result set as a cursor
    IF max_quantity IS NULL THEN
        OPEN p_result FOR
            SELECT 'No products sold' AS product_id, NULL AS name, 0 AS total_quantity FROM dual;
    ELSE
        OPEN p_result FOR
            SELECT p.product_id, p.name, SUM(op.quantity) AS total_quantity
            FROM product p
            JOIN orderproduct op ON p.product_id = op.product_id
            WHERE p.supplier_id = p_supplier_id
            GROUP BY p.product_id, p.name
            HAVING SUM(op.quantity) = max_quantity;
    END IF;
END get_high_demand_products;
/

-- calling
SET SERVEROUTPUT ON;

DECLARE
    v_cursor SYS_REFCURSOR;
    v_product_id VARCHAR2(100);
    v_name VARCHAR2(255);
    v_total_quantity NUMBER;
BEGIN
    -- Call the procedure
    get_high_demand_products('sup011', v_cursor);

    -- Fetch and display the result
    LOOP
        FETCH v_cursor INTO v_product_id, v_name, v_total_quantity;
        EXIT WHEN v_cursor%NOTFOUND;
        DBMS_OUTPUT.PUT_LINE('Product ID: ' || v_product_id || ', Name: ' || v_name || ', Total Quantity: ' || v_total_quantity);
    END LOOP;

    CLOSE v_cursor;
END;
/



