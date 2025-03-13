
// Country name to ISO 3-letter code mappings
export const countryToCode: Record<string, string> = {
  'Afghanistan': 'AFG', 'Albania': 'ALB', 'Algeria': 'DZA', 'Angola': 'AGO', 'Argentina': 'ARG',
  'Armenia': 'ARM', 'Australia': 'AUS', 'Austria': 'AUT', 'Azerbaijan': 'AZE', 'Bahamas': 'BHS',
  'Bangladesh': 'BGD', 'Belarus': 'BLR', 'Belgium': 'BEL', 'Belize': 'BLZ', 'Benin': 'BEN',
  'Bhutan': 'BTN', 'Bolivia': 'BOL', 'Bosnia and Herzegovina': 'BIH', 'Botswana': 'BWA', 'Brazil': 'BRA',
  'Brunei': 'BRN', 'Bulgaria': 'BGR', 'Burkina Faso': 'BFA', 'Burundi': 'BDI', 'Cambodia': 'KHM',
  'Cameroon': 'CMR', 'Canada': 'CAN', 'Central African Republic': 'CAF', 'Chad': 'TCD', 'Chile': 'CHL',
  'China': 'CHN', 'Colombia': 'COL', 'Congo': 'COG', 'Costa Rica': 'CRI', 'Croatia': 'HRV',
  'Cuba': 'CUB', 'Cyprus': 'CYP', 'Czech Republic': 'CZE', 'Denmark': 'DNK', 'Djibouti': 'DJI',
  'Dominican Republic': 'DOM', 'DR Congo': 'COD', 'Ecuador': 'ECU', 'Egypt': 'EGY', 'El Salvador': 'SLV',
  'Equatorial Guinea': 'GNQ', 'Eritrea': 'ERI', 'Estonia': 'EST', 'Eswatini': 'SWZ', 'Ethiopia': 'ETH',
  'Fiji': 'FJI', 'Finland': 'FIN', 'France': 'FRA', 'French Guiana': 'GUF', 'Gabon': 'GAB',
  'Gambia': 'GMB', 'Georgia': 'GEO', 'Germany': 'DEU', 'Ghana': 'GHA', 'Greece': 'GRC',
  'Greenland': 'GRL', 'Guatemala': 'GTM', 'Guinea': 'GIN', 'Guinea-Bissau': 'GNB', 'Guyana': 'GUY',
  'Haiti': 'HTI', 'Honduras': 'HND', 'Hungary': 'HUN', 'Iceland': 'ISL', 'India': 'IND',
  'Indonesia': 'IDN', 'Iran': 'IRN', 'Iraq': 'IRQ', 'Ireland': 'IRL', 'Israel': 'ISR',
  'Italy': 'ITA', 'Ivory Coast': 'CIV', 'Jamaica': 'JAM', 'Japan': 'JPN', 'Jordan': 'JOR',
  'Kazakhstan': 'KAZ', 'Kenya': 'KEN', 'Kosovo': 'UNK', 'Kuwait': 'KWT', 'Kyrgyzstan': 'KGZ',
  'Laos': 'LAO', 'Latvia': 'LVA', 'Lebanon': 'LBN', 'Lesotho': 'LSO', 'Liberia': 'LBR',
  'Libya': 'LBY', 'Lithuania': 'LTU', 'Luxembourg': 'LUX', 'Madagascar': 'MDG', 'Malawi': 'MWI',
  'Malaysia': 'MYS', 'Mali': 'MLI', 'Malta': 'MLT', 'Mauritania': 'MRT', 'Mexico': 'MEX',
  'Moldova': 'MDA', 'Mongolia': 'MNG', 'Montenegro': 'MNE', 'Morocco': 'MAR', 'Mozambique': 'MOZ',
  'Myanmar': 'MMR', 'Namibia': 'NAM', 'Nepal': 'NPL', 'Netherlands': 'NLD', 'New Zealand': 'NZL',
  'Nicaragua': 'NIC', 'Niger': 'NER', 'Nigeria': 'NGA', 'North Korea': 'PRK', 'North Macedonia': 'MKD',
  'Norway': 'NOR', 'Oman': 'OMN', 'Pakistan': 'PAK', 'Palestine': 'PSE', 'Panama': 'PAN',
  'Papua New Guinea': 'PNG', 'Paraguay': 'PRY', 'Peru': 'PER', 'Philippines': 'PHL', 'Poland': 'POL',
  'Portugal': 'PRT', 'Puerto Rico': 'PRI', 'Qatar': 'QAT', 'Romania': 'ROU', 'Russia': 'RUS',
  'Rwanda': 'RWA', 'Saudi Arabia': 'SAU', 'Senegal': 'SEN', 'Serbia': 'SRB', 'Sierra Leone': 'SLE',
  'Slovakia': 'SVK', 'Slovenia': 'SVN', 'Somalia': 'SOM', 'South Africa': 'ZAF', 'South Korea': 'KOR',
  'South Sudan': 'SSD', 'Spain': 'ESP', 'Sri Lanka': 'LKA', 'Sudan': 'SDN', 'Suriname': 'SUR',
  'Sweden': 'SWE', 'Switzerland': 'CHE', 'Syria': 'SYR', 'Taiwan': 'TWN', 'Tajikistan': 'TJK',
  'Tanzania': 'TZA', 'Thailand': 'THA', 'Timor-Leste': 'TLS', 'Togo': 'TGO', 'Tunisia': 'TUN',
  'Turkey': 'TUR', 'Turkmenistan': 'TKM', 'Uganda': 'UGA', 'Ukraine': 'UKR', 
  'United Arab Emirates': 'ARE', 'United Kingdom': 'GBR', 'United States': 'USA', 'Uruguay': 'URY',
  'Uzbekistan': 'UZB', 'Venezuela': 'VEN', 'Vietnam': 'VNM', 'Yemen': 'YEM', 'Zambia': 'ZMB',
  'Zimbabwe': 'ZWE',
  
  // Additional mappings to handle potential variations in country names
  'England': 'GBR',
  'Scotland': 'GBR',
  'Wales': 'GBR',
  'Northern Ireland': 'GBR',
  'UK': 'GBR',
  'USA': 'USA',
  'U.S.A.': 'USA',
  'U.S.': 'USA',
  'United States of America': 'USA',
  'UAE': 'ARE',
  'U.A.E.': 'ARE'
};

// Create the reverse mapping for lookup by ISO code
export const codeToCountry: Record<string, string> = Object.entries(countryToCode).reduce(
  (acc, [country, code]) => {
    if (!acc[code] || country.length > acc[code].length) {
      // Prefer the longer/more formal names for the reverse mapping
      acc[code] = country;
    }
    return acc;
  },
  {} as Record<string, string>
);
