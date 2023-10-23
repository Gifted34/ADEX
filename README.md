# DeX Initialiser DHIS2 Application

### Introduction

The Data Exchange Initializer is a powerful software tool designed to facilitate the seamless data exchange initialization of data elements and indicators from one DHIS2 (District Health Information System 2) instance to another. It simplifies the process by extracting data values using codes and inializing the process in the host DHIS2 instance securely to the target DHIS2 instance. Based on the given period, organisation unit data values are prepared and made ready for initialization.

This software application utilizes both the d2 library and the DHIS2 UI library to enhance data exchange intialization capabilities within the DHIS2 platform. Designed as a custom app that runs inside DHIS2, it offers a seamless and efficient solution for initializing data elements and indicators data values.

# Request for the Proposed solution

Initially, data echange using the primary workflow, requires one to have knowledge in programming where the data exchange initializer payload is in JSON format. The payload is prepared to be submited using HTTP Client such as Postman. Below is the payload representation provided by the DHIS2 core team:

            {
              "name": "External data exchange with basic authentication",
              "source": {
                "requests": [
                  {
                    "name": "ANC",
                    "visualization": null,
                    "dx": [
                      "fbfJHSPpUQD",
                      "cYeuwXTCPkU",
                      "Jtf34kNZhzP"
                    ],
                    "pe": [
                      "LAST_12_MONTHS",
                      "202201"
                    ],
                    "ou": [
                      "ImspTQPwCqd"
                    ],
                    "inputIdScheme": "UID",
                    "outputIdScheme": "CODE"
                  }
                ]
              },
              "target": {
                "type": "EXTERNAL",
                "api": {
                    "url": "https://play.dhis2.org/2.38.2.1",
                    "username": "admin",
                    "password": "district"
                },
                "request": {
                  "idScheme": "CODE"
                }
              }
            }
**Issue**

This workflow is viable when the data dimensions are not in large volumes and require manual typing of the data dimension codes, which is prone to errors and can impact data quality.

**Solution**

DeX Initializer is designed to provide a graphical user interface that will afford user experience as it utilize the DHIS2 UI library and modern presentation of reporting tools. 

Once data exchange initialization process is successful, then user can view all initialized processes in the generic Data exchange App in DHIS2.

**NOTE**

These applications are accessed in the same DHIS2 instance.

**Key Features:**

1. **d2 Library Integration**: The Data Exchange Initializer leverages the powerful d2 library within the DHIS2 platform. This integration enhances the software's compatibility with DHIS2, enabling smooth data exchange and synchronization.

2. **DHIS2 UI Library Support**: The Data Exchange Initializer also utilizes the DHIS2 UI library, which provides a rich set of user interface components and design patterns. This integration enhances the custom app's user experience, ensuring an intuitive and visually appealing interface
3. **Code-based Data Element and Indicator Mapping**: The Data Exchange Initializer uses unique codes to identify data elements and indicators in the source DHIS2 instance. These codes enable efficient mapping with their corresponding counterparts in the target DHIS2 instance.

4. **Flexible Data Selection**: Users can easily select the specific data elements and indicators they want to transfer. The software provides a user-friendly interface to browse and choose the relevant organizational units, periods, and data values.

5. **Data Exchange Initialization**: Once the data elements and indicators are selected, the Data Exchange Initializer is set to override the process of using POSTMAN for the data initialization utilizing secure APIs (Application Programming Interface) to establish a connection and initialize the data seamlessly.

6. **Data Validation and Error Handling**: The software performs comprehensive data validation to ensure the accuracy and integrity of the initialized data. It identifies any errors or inconsistencies and provides detailed error notification for easy troubleshooting and resolution.
7. **User-friendly Interface**: The Data Exchange Initializer offers an intuitive and user-friendly interface, making it easy for both technical and non-technical users to navigate and perform data exchange initialization phase.

### Fetching Metadata

Inorder to do the initialisation there is a need for one to specify the data elements or indicator,and the organisation unit. These parameters are fetched in the source DHIS2 instance using the DHIS2 cli useDataQuery hooks with a query specified below

            const query = {
                    organisationUnits: {
                        resource: 'organisationUnits',
                        params: {
                            paging: false,
                              fields: [
                                    "id,name,level,path,displayName,code,children,ancestors,created,href,user,users,userAccesses",
                                ],order: 'level',
                        }
                    },
                    indicators: {
                        resource: 'indicators',
                        params: {
                            paging: false,
                            fields: ["id", "name", "displayName", "code"],
                        }
                    },
                    dataElements: {
                        resource: 'dataElements',
                        params: {
                            paging: false,
                            fields: ["id", "name", "formName", "displayName", "code"]
                        }
                    },
                    periodTypes: {
                        resource: 'periodTypes',
                        params: {
                            fields: ["*"]
                        }
                    }
                }

### Initialisation of Dex Object

#### Use cases

  Initialization for:
  
  1. Internal data echange

For data exchange of type internal, there is no need to specify the base URL for the target DHIS2 instance. For this type of initialisation the user has to specify the payload with the following parameters the exchange name, source object with the following attributes params object where the period type is specified, a request object where the name, data element or indicators,period, organisation units,and filters. We also have the inputIdScheme,outputDataElementIdScheme,and outPutIdScheme, And finaly we have the target object where we specify the type of initialisation, the request object which has dataElementIdScheme,orgUnitIdScheme,categoryOptionComboIdComboScheme, and idScheme. An example of an initialisation object is attached below

            {
                "name": "Internal data exchange",
                "source": {
                    "params": {
                    "periodTypes": [
                        "MONTHLY",
                        "QUARTERLY"
                    ]
                    },
                    "requests": [
                    {
                        "name": "ANC",
                        "visualization": null,
                        "dx": [
                        "fbfJHSPpUQD",
                        "cYeuwXTCPkU",
                        "Jtf34kNZhzP"
                        ],
                        "pe": [
                        "LAST_12_MONTHS",
                        "202201"
                        ],
                        "ou": [
                        "ImspTQPwCqd"
                        ],
                        "filters": [
                        {
                            "dimension": "Bpx0589u8y0",
                            "items": [
                            "oRVt7g429ZO", 
                            "MAs88nJc9nL"
                            ]
                        }
                        ],
                        "inputIdScheme": "UID",
                        "outputDataElementIdScheme": "UID",
                        "outputOrgUnitIdScheme": "UID",
                        "outputIdScheme": "UID"
                    }
                    ]
                },
                "target": {
                    "type": "INTERNAL",
                    "request": {
                    "dataElementIdScheme": "UID",
                    "orgUnitIdScheme": "UID",
                    "categoryOptionComboIdScheme": "UID",
                    "idScheme": "UID"
                    }
                }
            }

   
  3. External Data exchange
     
For data exchanges of type external, the base URL and authentication credentials for the target DHIS 2 instance must be specified. For authentication, basic authentication and personal access tokens (PAT) are supported.

             {
            "name": "External data exchange with basic authentication",
            "source": {
                "requests": [
                {
                    "name": "ANC",
                    "visualization": null,
                    "dx": [
                    "fbfJHSPpUQD",
                    "cYeuwXTCPkU",
                    "Jtf34kNZhzP"
                    ],
                    "pe": [
                    "LAST_12_MONTHS",
                    "202201"
                    ],
                    "ou": [
                    "ImspTQPwCqd"
                    ],
                    "inputIdScheme": "UID",
                    "outputIdScheme": "CODE"
                }
                ]
            },
            "target": {
                "type": "EXTERNAL",
                "api": {
                    "url": "https://play.dhis2.org/2.38.2.1",
                    "username": "admin",
                    "password": "district"
                },
                "request": {
                "idScheme": "CODE"
                }
            }
            }



After doing the initialisation for the two usecase the user then submits the initialised object to the DHIS2 data exchange application.

you can access more documentation on the initialisation by navigating to the following link [Data exchange initialisation](https://docs.dhis2.org/en/develop/using-the-api/dhis-core-version-239/data-exchange.html) 


  ### DHIS2 Data exchange submit

After initializing the in the Dex initialization application, users can go to the Data exchange application in DHIS2. In this application, users can select an initialization option and view a table with data values and their corresponding data element or indicator names. Users then need to click the submit button to transfer these values to the desired DHIS2 instance.
