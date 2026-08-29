package com.t5.enterpriseprocurement.service;

import com.t5.enterpriseprocurement.entity.PurchaseRequest;
import com.t5.enterpriseprocurement.entity.User;

public interface EmailService {

    void sendEmail(
            String to,
            String subject,
            String body);

    void sendRegistrationEmail(User user);

    void sendPurchaseSubmissionEmail(
            User user,
            PurchaseRequest purchaseRequest);

    void sendManagerApprovalEmail(
            User financeManager,
            PurchaseRequest purchaseRequest);

    void sendFinalApprovalEmail(
            User requester,
            PurchaseRequest purchaseRequest);

    void sendFinanceApprovalEmail(
            User procurementManager,
            PurchaseRequest purchaseRequest);

    void sendProcurementApprovalEmail(
            User requester,
            PurchaseRequest purchaseRequest);
}