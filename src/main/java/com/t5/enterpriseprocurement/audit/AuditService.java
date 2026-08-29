package com.t5.enterpriseprocurement.audit;

public interface AuditService {

    void log(String username,
             String action,
             String module);

}