/*
 * Copyright (C) 2014 TopCoder Inc., All Rights Reserved.
 */
package gov.opm.scrd.services.impl.reporting;

import static junit.framework.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertTrue;
import gov.opm.scrd.BasePersistenceTests;
import gov.opm.scrd.TestsHelper;
import gov.opm.scrd.entities.lookup.PaymentType;
import gov.opm.scrd.services.ExportType;
import gov.opm.scrd.services.impl.reporting.PaymentPendingApprovalReportRequest;
import gov.opm.scrd.services.impl.reporting.PaymentPendingApprovalReportResponse;
import gov.opm.scrd.services.impl.reporting.PaymentPendingApprovalReportResponseItem;
import gov.opm.scrd.services.impl.reporting.PaymentPendingApprovalReportService;
import gov.opm.scrd.services.impl.reporting.ReportHelper;

import java.math.BigDecimal;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;

import javax.persistence.EntityManager;

import junit.framework.JUnit4TestAdapter;

import org.jboss.logging.Logger;
import org.junit.Before;
import org.junit.Test;

/**
 * <p>
 * Unit tests for {@link PaymentPendingApprovalReportService} class.
 * </p>
 *
 * @author j3_guile
 * @version 1.0
 */
public class PaymentPendingApprovalReportServiceTests extends BasePersistenceTests {
    /**
     * <p>
     * Represents the entity manager used in tests.
     * </p>
     */
    private static EntityManager entityManager;

    /**
     * <p>
     * Represents the <code>PaymentPendingApprovalReportService</code> instance used in tests.
     * </p>
     */
    private PaymentPendingApprovalReportService instance;

    /**
     * <p>
     * Represents the logger used in tests.
     * </p>
     */
    private Logger logger;

    /**
     * <p>
     * Adapter for earlier versions of JUnit.
     * </p>
     *
     * @return a test suite.
     */
    public static junit.framework.Test suite() {
        return new JUnit4TestAdapter(PaymentPendingApprovalReportServiceTests.class);
    }

    /**
     * <p>
     * Sets up the unit tests.
     * </p>
     *
     * @throws Exception to JUnit.
     */
    @Override
    @Before
    public void setUp() throws Exception {
        super.setUp();

        entityManager = getEntityManager();

        logger = Logger.getLogger(getClass());
        createReportingPaymentData();

        instance = new PaymentPendingApprovalReportService();
        TestsHelper.setField(instance, "paymentType", PaymentType.ORDINARY);
        TestsHelper.setField(instance, "logger", logger);
        TestsHelper.setField(instance, "entityManager", entityManager);
        TestsHelper.setField(instance, "reportName", "Payments Pending Supervisor Approval");
    }

    /**
     * <p>
     * Accuracy test for the method <code>getReport(PaymentPendingApprovalReportRequest request)</code>.<br>
     * The result should be correct.
     * </p>
     *
     * @throws Exception to JUnit.
     */
    @Test
    public void test_getReport() throws Exception {
        PaymentPendingApprovalReportResponse response = instance.getReport(new PaymentPendingApprovalReportRequest());
        assertNotNull(response);

        // verify some values
        List<PaymentPendingApprovalReportResponseItem> items = response.getItems();
        assertNotNull(items);
        assertTrue(items.size() == 2); // should contain 2 items

        // sort
        Collections.sort(items, new Comparator<PaymentPendingApprovalReportResponseItem>() {
            @Override
            public int compare(PaymentPendingApprovalReportResponseItem o1,
                PaymentPendingApprovalReportResponseItem o2) {
                if (o1.getAmount() != null && o2.getAmount() != null) {
                    return o1.getAmount().compareTo(o2.getAmount());
                }
                return 0;
            }
        });
        PaymentPendingApprovalReportResponseItem item = items.get(0);
        assertEquals(ReportHelper.formatMoney(new BigDecimal(20.00)),
            ReportHelper.formatMoney(item.getAmount()));
        assertEquals("000-00-01", item.getBatchNumber());
    }

    /**
     * <p>
     * Accuracy test for the method <code>exportReport</code>.<br>
     * The result should be correct.
     * </p>
     *
     * @throws Exception to JUnit.
     */
    @Test
    public void test_exportReportPDF() throws Exception {
        PaymentPendingApprovalReportResponse response = instance.getReport(new PaymentPendingApprovalReportRequest());
        byte[] exportReport = instance.exportReport(response, ExportType.PDF);
        String filename = "log/PaymentPendingApprovalReportServiceTests.PDF";
        writeFile(exportReport, filename);
    }

    /**
     * <p>
     * Accuracy test for the method <code>exportReport</code>.<br>
     * The result should be correct.
     * </p>
     *
     * @throws Exception to JUnit.
     */
    @Test
    public void test_exportReportRTF() throws Exception {
        PaymentPendingApprovalReportResponse response = instance.getReport(new PaymentPendingApprovalReportRequest());
        byte[] exportReport = instance.exportReport(response, ExportType.RTF);
        String filename = "log/PaymentPendingApprovalReportServiceTests.RTF";
        writeFile(exportReport, filename);
    }
}