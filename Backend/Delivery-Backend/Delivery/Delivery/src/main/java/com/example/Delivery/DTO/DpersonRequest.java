package com.example.Delivery.DTO;

public class DpersonRequest {

    private String D_Person_id;
    private  String name;
    private  String email;
    private  String address;
    private  String company_name;
    private  String password;

    public String getD_Person_id() {
        return D_Person_id;
    }

    public void setD_Person_id(String d_Person_id) {
        D_Person_id = d_Person_id;
    }

    public  String getName() {
        return name;
    }

    public  void setName(String name) {
        this.name = name;
    }

    public  String getEmail() {
        return email;
    }

    public  void setEmail(String email) {
        this.email = email;
    }

    public  String getAddress() {
        return address;
    }

    public  void setAddress(String address) {
        this.address = address;
    }

    public  String getCompany_name() {
        return company_name;
    }

    public  void setCompany_name(String company_name) {
        this.company_name = company_name;
    }

    public  String getPassword() {
        return password;
    }

    public  void setPassword(String password) {
        this.password = password;
    }
}
