export interface Iperfil {
    Status?: string;
    FirstName?: string;
    MiddleName?: string;
    LastName?: string;
    Gender?: string;
    DateOfBirth?: string;
    MaritalStatus?: string;
    LegalEntityType?: string;
    Nationality?: string;
    WorkDetails?: [
        {
            CompanyName?: string;
            ProfessionName?: string;
            JobTitle?: string;
        }
    ];
    Documents?: [
        {
            DocumentValue?: string;
        }
    ];
    Contacts?: [
        {
            PhoneCountryCode?: string;
            PhoneNumber?: string;
            EmailAddress?: string;
        }
    ];
    Address?: [
        {
            Department?: string;
            StreetName?: string;
            BuildingNumber?: string;
            PostCode?: string;
            TownName?: string;
            CountrySubDivision?: string;
            Country?: string;
            
        }
    ];
}
