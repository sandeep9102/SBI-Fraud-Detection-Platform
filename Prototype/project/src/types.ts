export interface FraudData {
  ASSURED_AGE: number;
  NOMINEE_RELATION: string;
  OCCUPATION: string;
  Policy_Sum_Assured: number;
  Premium: number;
  Annual_Income: number;
  Policy_Term: number;
  Policy_Payment_Term: number;
  Bank_code: string;
  Date_of_Death: string;
  Policy_to_Death_Days: number;
  Death_to_Intimation_Days: number;
  Policy_to_Intimation_Days: number;
  Premium_Payment_Mode_Monthly: number;
  Premium_Payment_Mode_Quarterly: number;
  Premium_Payment_Mode_Single: number;
  Premium_Payment_Mode_Yearly: number;
  Holder_marital_status_Single: number;
  Holder_marital_status_divorced: number;
  Holder_marital_status_widowed: number;
  Indiv_req_flag_Non_Medical: number;
  Product_Type_Non_Par: number;
  Product_Type_Pension: number;
  Product_Type_Traditional: number;
  Product_Type_ULIP: number;
  Product_Type_Variable: number;
  CHANNEL_Institutional_Alliance: number;
  CHANNEL_Mail_and_Others: number;
  CHANNEL_Retail_Agency: number;
  STATUS_Claim: number;
  STATUS_Inforce: number;
  STATUS_Lapse: number;
  STATUS_Maturity: number;
  STATUS_Rejection: number;
  STATUS_Technical_Lapse: number;
  STATUS_Terminated: number;
  STATUS_Withdrawal: number;
  SUB_STATUS_None: number;
  SUB_STATUS_Death_Claim_Paid: number;
  SUB_STATUS_Death_Claim_Repudiated: number;
  SUB_STATUS_Declined: number;
  SUB_STATUS_Dishonour: number;
  SUB_STATUS_Disinvested_Paid: number;
  SUB_STATUS_Disinvested_Unpaid: number;
  SUB_STATUS_Free_Look_Cancellation: number;
  SUB_STATUS_Intimated_Death_Claim: number;
  SUB_STATUS_Intimated_Death_Claim_Annuity: number;
  SUB_STATUS_Other_Reason: number;
  SUB_STATUS_Paid_Up: number;
  SUB_STATUS_Refunded: number;
  SUB_STATUS_Surrendered: number;
  SUB_STATUS_Surrendered_Reinvested_Auto: number;
  SUB_STATUS_Unpaid: number;
  Fraud_Category?: number;
}