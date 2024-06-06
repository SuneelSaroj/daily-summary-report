const db = require("../db/conn").pool;
const asyncHandler = require("../middleware/async");

const getViewData = asyncHandler(async (req, res, next) => {
  // console.log("View Controller-> getViewData");
  try {
    const cus_id = req.body.data.searchTerm;
    const startDate = req.body.data.startDate;
    const endDate = req.body.data.endDate;
    // let tagNo = req.body.tagNo;
    // let custVendName = req.body.custVendName;
    // let mill = req.body.mill;
    // let warehouse = req.body.warehouse;
    console.log(cus_id);
    console.log(startDate);
    console.log(endDate);
    let status = req.body.status;
    let sql = `SELECT
    orh_ord_pfx || '-' || orh_ord_no AS "SalesOrder",
    orh_sld_cus_id AS "CustomerID",
    (SELECT cus_cus_nm FROM arrcus_rec WHERE cus_cmpy_id = orh_cmpy_id AND
    cus_cus_id = orh_sld_cus_id) AS "Customer",
    "PaymentMethod",
    "CreditCard1",
    "CreditCard1Amount",

    "CCAuthorization1",
    "Last4digitsofCC1",
    "CreditCard2",
    "CreditCard2Amount",
    "CCAuthorization2",
    "Last4digitsofCC2",
    "CreditCard3",
    "CreditCard3Amount",
    "CCAuthorization3",
    "Last4digitsofCC3",

   
    "ACHTrackNo",
    "ACHAmount",
    SUM("ACHAmount") OVER () as "TotalACHAmount",
    (CASE WHEN trim("CreditCard1")= 'VISA' THEN "CreditCard1Amount" ELSE 0 END) +
          (CASE WHEN trim("CreditCard2") = 'VISA' THEN "CreditCard2Amount" ELSE 0 END) +
          (CASE WHEN trim("CreditCard3") = 'VISA' THEN "CreditCard3Amount" ELSE 0 END) AS "VISA",

          sum((CASE WHEN trim("CreditCard1")= 'VISA' THEN "CreditCard1Amount" ELSE 0 END) +
          (CASE WHEN trim("CreditCard2") = 'VISA' THEN "CreditCard2Amount" ELSE 0 END) +
          (CASE WHEN trim("CreditCard3") = 'VISA' THEN "CreditCard3Amount" ELSE 0 END)) over () "VisaTotal",

          (CASE WHEN trim("CreditCard1")= 'AMEX' THEN "CreditCard1Amount" ELSE 0 END) +
          (CASE WHEN trim("CreditCard2") = 'AMEX' THEN "CreditCard2Amount" ELSE 0 END) +
          (CASE WHEN trim("CreditCard3") = 'AMEX' THEN "CreditCard3Amount" ELSE 0 END) AS "AMEX",
          
          sum((CASE WHEN trim("CreditCard1")= 'AMEX' THEN "CreditCard1Amount" ELSE 0 END) +
                (CASE WHEN trim("CreditCard2") = 'AMEX' THEN "CreditCard2Amount" ELSE 0 END) +
                (CASE WHEN trim("CreditCard3") = 'AMEX' THEN "CreditCard3Amount" ELSE 0 END)) over () AS "AMEXTotal",

    (CASE WHEN trim("CreditCard1")= 'MASTERCARD' THEN "CreditCard1Amount" ELSE 0 END) +
          (CASE WHEN trim("CreditCard2") = 'MASTERCARD' THEN "CreditCard2Amount" ELSE 0 END) +
          (CASE WHEN trim("CreditCard3") = 'MASTERCARD' THEN "CreditCard3Amount" ELSE 0 END) AS "MASTERCARD",

          sum((CASE WHEN trim("CreditCard1")= 'MASTERCARD' THEN "CreditCard1Amount" ELSE 0 END) +
                (CASE WHEN trim("CreditCard2") = 'MASTERCARD' THEN "CreditCard2Amount" ELSE 0 END) +
                (CASE WHEN trim("CreditCard3") = 'MASTERCARD' THEN "CreditCard3Amount" ELSE 0 END)) over () AS "MastercardTotal",

    (CASE WHEN trim("CreditCard1")= 'DISCOVER' THEN "CreditCard1Amount" ELSE 0 END) +
          (CASE WHEN trim("CreditCard2") = 'DISCOVER' THEN "CreditCard2Amount" ELSE 0 END) +
          (CASE WHEN trim("CreditCard3") = 'DISCOVER' THEN "CreditCard3Amount" ELSE 0 END) AS "DISCOVER",

          sum((CASE WHEN trim("CreditCard1")= 'DISCOVER' THEN "CreditCard1Amount" ELSE 0 END) +
                (CASE WHEN trim("CreditCard2") = 'DISCOVER' THEN "CreditCard2Amount" ELSE 0 END) +
                (CASE WHEN trim("CreditCard3") = 'DISCOVER' THEN "CreditCard3Amount" ELSE 0 END)) over () AS "DiscoverTotal",

    (CASE WHEN trim("CreditCard1")= 'OTHER' THEN "CreditCard1Amount" ELSE 0 END) +
          (CASE WHEN trim("CreditCard2") = 'OTHER' THEN "CreditCard2Amount" ELSE 0 END) +
          (CASE WHEN trim("CreditCard3") = 'OTHER' THEN "CreditCard3Amount" ELSE 0 END) AS "OTHER",


    sum((CASE WHEN trim("CreditCard1")= 'OTHER' THEN "CreditCard1Amount" ELSE 0 END) +
          (CASE WHEN trim("CreditCard2") = 'OTHER' THEN "CreditCard2Amount" ELSE 0 END) +
          (CASE WHEN trim("CreditCard3") = 'OTHER' THEN "CreditCard3Amount" ELSE 0 END)) over () AS "OtherTotal",


          "CheckAuthorizationNumber",
          "CheckAmount",
          SUM("CheckAmount") OVER () as "TotalCheckAmount",
          "CashAmount",
          SUM("CashAmount") OVER () as "TotalCashAmount"


    
    FROM ortorh_rec
    INNER JOIN (
    SELECT DISTINCT ava_key_fld01_var cmpy_id, ava_key_fld02_var ord_pfx,
    ava_key_fld03_var ord_no,
    (SELECT ava_attr_val_var FROM xctava_rec WHERE ava_tbl_nm = 'ortorh' AND
    ava_attr = 'PMT' AND ava_key_fld01_var = ava.ava_key_fld01_var AND ava_key_fld02_var
    = ava.ava_key_fld02_var AND ava_key_fld03_var = ava.ava_key_fld03_var) AS
    "PaymentMethod",
    (select ava_attr_val_var from xctava_rec where ava_tbl_nm='ortorh' and ava_attr='CCTYP1'
    and ava_key_fld01_var = ava.ava_key_fld01_var and ava_key_fld02_var =
    ava.ava_key_fld02_var and ava_key_fld03_var = ava.ava_key_fld03_var) as "CreditCard1",
    (select ava_attr_val_var from xctava_rec where ava_tbl_nm='ortorh' and
    ava_attr='CCTYP2' and ava_key_fld01_var = ava.ava_key_fld01_var and
    ava_key_fld02_var = ava.ava_key_fld02_var and ava_key_fld03_var =
    ava.ava_key_fld03_var) as "CreditCard2",
    (select ava_attr_val_var from xctava_rec where ava_tbl_nm='ortorh' and
    ava_attr='CCTYP3' and ava_key_fld01_var = ava.ava_key_fld01_var and
    ava_key_fld02_var = ava.ava_key_fld02_var and ava_key_fld03_var =
    ava.ava_key_fld03_var) as "CreditCard3",
    (select ava_attr_val_var from xctava_rec where ava_tbl_nm='ortorh' and
    ava_attr='AUTH1' and ava_key_fld01_var = ava.ava_key_fld01_var and ava_key_fld02_var
    = ava.ava_key_fld02_var and ava_key_fld03_var = ava.ava_key_fld03_var) as
    "CCAuthorization1",
    (select ava_attr_val_var from xctava_rec where ava_tbl_nm='ortorh' and
    ava_attr='AUTH2' and ava_key_fld01_var = ava.ava_key_fld01_var and ava_key_fld02_var
    = ava.ava_key_fld02_var and ava_key_fld03_var = ava.ava_key_fld03_var) as
    "CCAuthorization2",
    (select ava_attr_val_var from xctava_rec where ava_tbl_nm='ortorh' and
    ava_attr='AUTH3' and ava_key_fld01_var = ava.ava_key_fld01_var and ava_key_fld02_var
    = ava.ava_key_fld02_var and ava_key_fld03_var = ava.ava_key_fld03_var) as
    "CCAuthorization3",
    (select ava_attr_val_var from xctava_rec where ava_tbl_nm='ortorh' and
    ava_attr='CCL41' and ava_key_fld01_var = ava.ava_key_fld01_var and ava_key_fld02_var
    = ava.ava_key_fld02_var and ava_key_fld03_var = ava.ava_key_fld03_var) as
    "Last4digitsofCC1",
    (select ava_attr_val_var from xctava_rec where ava_tbl_nm='ortorh' and
    ava_attr='CCL42' and ava_key_fld01_var = ava.ava_key_fld01_var and ava_key_fld02_var
    = ava.ava_key_fld02_var and ava_key_fld03_var = ava.ava_key_fld03_var) as
    "Last4digitsofCC2",
    (select ava_attr_val_var from xctava_rec where ava_tbl_nm='ortorh' and
    ava_attr='CCL43' and ava_key_fld01_var = ava.ava_key_fld01_var and ava_key_fld02_var
    = ava.ava_key_fld02_var and ava_key_fld03_var = ava.ava_key_fld03_var) as
    "Last4digitsofCC3",
    (select CASE
    WHEN translate(TRIM(ava_attr_val_var), ',$', '') ~ '^-?[0-9]+(\.[0-9]+)?$'

       THEN CAST(translate(TRIM(ava_attr_val_var), ',$', '') AS DOUBLE PRECISION)
    
    ELSE
      0
  END from xctava_rec where ava_tbl_nm='ortorh' and
    ava_attr='CHKAMT' and ava_key_fld01_var = ava.ava_key_fld01_var and
    ava_key_fld02_var = ava.ava_key_fld02_var and ava_key_fld03_var =
    ava.ava_key_fld03_var) as "CheckAmount",

    (select ava_attr_val_var from xctava_rec where ava_tbl_nm='ortorh' and
    ava_attr='CHKAUT' and ava_key_fld01_var = ava.ava_key_fld01_var and
    ava_key_fld02_var = ava.ava_key_fld02_var and ava_key_fld03_var =
    ava.ava_key_fld03_var) as "CheckAuthorizationNumber",
    (select CASE
    WHEN translate(TRIM(ava_attr_val_var), ',$', '') ~ '^-?[0-9]+(\.[0-9]+)?$'

       THEN CAST(translate(TRIM(ava_attr_val_var), ',$', '') AS DOUBLE PRECISION)
    
    ELSE
      0
  END from xctava_rec where ava_tbl_nm='ortorh' and
    ava_attr='CASH' and ava_key_fld01_var = ava.ava_key_fld01_var and ava_key_fld02_var =
    ava.ava_key_fld02_var and ava_key_fld03_var = ava.ava_key_fld03_var) as "CashAmount",


(
  select CASE
    WHEN translate(TRIM(ava_attr_val_var), ',$', '') ~ '^-?[0-9]+(\.[0-9]+)?$'

       THEN CAST(translate(TRIM(ava_attr_val_var), ',$', '') AS DOUBLE PRECISION)
    
    ELSE
      0
  END
  FROM xctava_rec
  WHERE ava_tbl_nm='ortorh' AND ava_attr='CCAMT1'
    AND ava_key_fld01_var = ava.ava_key_fld01_var
    AND ava_key_fld02_var = ava.ava_key_fld02_var
    AND ava_key_fld03_var = ava.ava_key_fld03_var
  GROUP BY ava_attr_val_var
) AS "CreditCard1Amount",



    (select CASE
    WHEN translate(TRIM(ava_attr_val_var), ',$', '') ~ '^-?[0-9]+(\.[0-9]+)?$'

       THEN CAST(translate(TRIM(ava_attr_val_var), ',$', '') AS DOUBLE PRECISION)
    
    ELSE
      0
  END from xctava_rec where ava_tbl_nm='ortorh' and
    ava_attr='CCAMT2' and ava_key_fld01_var = ava.ava_key_fld01_var and
    ava_key_fld02_var = ava.ava_key_fld02_var and ava_key_fld03_var =
    ava.ava_key_fld03_var) as "CreditCard2Amount",
    (select CASE
    WHEN translate(TRIM(ava_attr_val_var), ',$', '') ~ '^-?[0-9]+(\.[0-9]+)?$'

       THEN CAST(translate(TRIM(ava_attr_val_var), ',$', '') AS DOUBLE PRECISION)
    
    ELSE
      0
  END from xctava_rec where ava_tbl_nm='ortorh' and
    ava_attr='CCAMT3' and ava_key_fld01_var = ava.ava_key_fld01_var and
    ava_key_fld02_var = ava.ava_key_fld02_var and ava_key_fld03_var =
    ava.ava_key_fld03_var) as "CreditCard3Amount",
    (select ava_attr_val_var from xctava_rec where ava_tbl_nm='ortorh' and ava_attr='ACTTRC'
    and ava_key_fld01_var = ava.ava_key_fld01_var and ava_key_fld02_var =
    ava.ava_key_fld02_var and ava_key_fld03_var = ava.ava_key_fld03_var) as
    "ACHTrackNo",
    (select CASE
    WHEN translate(TRIM(ava_attr_val_var), ',$', '') ~ '^-?[0-9]+(\.[0-9]+)?$'

       THEN CAST(translate(TRIM(ava_attr_val_var), ',$', '') AS DOUBLE PRECISION)
    
    ELSE
      0
  END from xctava_rec where ava_tbl_nm='ortorh' and
    ava_attr='ACHAMT' and ava_key_fld01_var = ava.ava_key_fld01_var and
    ava_key_fld02_var = ava.ava_key_fld02_var and ava_key_fld03_var =
    ava.ava_key_fld03_var) as "ACHAmount"
    FROM xctava_rec ava
    WHERE ava.ava_tbl_nm = 'ortorh'
    ) avt ON avt.ord_pfx = orh_ord_pfx AND CAST(avt.ord_no AS INT) = orh_ord_no and orh_ord_pfx ='SO'

INNER JOIN ivtivs_rec on ivs_cmpy_id=orh_cmpy_id and ivs_ord_pfx=orh_ord_pfx and CAST(ord_no AS INT)= ivs_ord_no and orh_ord_pfx ='SO'

INNER JOIN ivtivh_Rec on ivs_cmpy_id=ivh_cmpy_id and ivs_inv_pfx=ivh_inv_pfx and ivs_inv_no = ivh_inv_no

`;
    if (cus_id) {
      sql = sql + ` and orh_sld_cus_id = cast(${cus_id} as varchar)`;
    }
    // if (startDate && endDate) {
    //   sql =
    //     sql +
    //     ` AND tsa_crtd_dtts >= '${startDate}' AND tsa_crtd_dtts <= '${endDate}'`;
    // }

    if (startDate && endDate) {
      sql =
        sql +
        ` and ivh_inv_dt >= '${startDate}' and ivh_inv_dt <= '${endDate}'`;
    }
    // if (ncrNo) {
    //   sql = sql + ` and nit_ncr_no = ${ncrNo}`;
    // }

    console.log(sql);

    const data = await db.query(sql);

    if (data.rowCount > 0) {
      console.log("View Data ROW COUNT", data.rowCount);

      return res.status(200).send({ success: true, data: data.rows });
    } else {
      console.log("View Data not found");
      return res
        .status(206)
        .send({ success: false, message: "View data not found" });
    }
  } catch (e) {
    console.log(e);
    return res
      .status(206)
      .json({ success: false, message: "Code: " + e.message });
  }
});

module.exports = {
  getViewData,
};
