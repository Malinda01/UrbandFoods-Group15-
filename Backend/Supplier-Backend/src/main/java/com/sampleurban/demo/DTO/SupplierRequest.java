package com.sampleurban.demo.DTO;

public class SupplierRequest {
    private String supplierId;
    private String supplierName;
    private String email;
    private String phoneNumber;
    private String address;
    private String pass;
    private String supplierType; // supplierType field

    // Getters and Setters
    public String getSupplierId() {
        return supplierId;
    }

    public void setSupplierId(String supplierId) {
        this.supplierId = supplierId;
    }

    public String getSupplierName() {
        return supplierName;
    }

    public void setSupplierName(String supplierName) {
        this.supplierName = supplierName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getPass() {
        return pass;
    }

    public void setPass(String pass) {
        this.pass = pass;
    }

    public String getSupplierType() {
        return supplierType;  // Getter for supplierType
    }

    public void setSupplierType(String supplierType) {
        this.supplierType = supplierType;  // Setter for supplierType
    }
}
