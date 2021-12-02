export interface IcurrentCredit {
    loans?: {
        loansQuantity?: number;
        loanStatusCount?: {
            completed?: number;
            inProgress?: number;
        }
    };
    payments?: {
        goodPayments?: number;
        badPayments?: number;
    };
    currentLoans?: {
        totalAmount?: number;
        totalCurrentAmount?: number;
        totalPayments?: number;
        payments?: {
            goodPayments?: number;
            badPayments?: number;
        };
    };
}
