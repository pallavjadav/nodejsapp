sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";

        return Controller.extend("test.testapp.controller.View1", {
            onInit: function () {
                var oModel = new sap.ui.model.json.JSONModel({
                    username: "pallav",
                    password:"011194"
                });
                this.getView().setModel(oModel, "formModel")
            },
            onRegister: function(){
                $.ajax({
                    url: "/register",
                    method: "POST",
                    data:   this.getView().getModel("formModel").getData(),
                    dataType: "json",
                    success: function (response) {
                        console.log(response);
                    },
                    error: function (error) {
                        new sap.m.MessageToast.show(error.responseText);
                    }
                });
            },
            onSubmit: function(){
                $.ajax({
                    url: "/login",
                    method: "POST",
                    data:   this.getView().getModel("formModel").getData(),
                    dataType: "json",
                    success: function (response) {
                        console.log(response);
                    },
                    error: function (xhr, status, error) {
                        new sap.m.MessageToast.show(xhr.responseText);
                    }
                });
                
            }
        });
    });
