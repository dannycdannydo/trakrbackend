const distractions = {
    roadNames:[
        'road', 'street', 'way', 'avenue', 'drive', 'drive', 'lane', 'grove', 'gardens', 'house', 'hall', 'manor', 'lodge', 'new',
        'place', 'circus', 'crescent', 'bypass', 'close', 'square', 'hill', 'mews', 'vale', 'end', 'rise', 'row', 'corner'
    ],
    companyNames:[
        'retail', 'plc', 'ltd', 'limited', 'centre'
    ]
}

const townsAndCities = {
    'North West': ['Sale, Manchester', 'Wisbech', 'Alsager', 'Birchwood', 'Bollington', 'Chester', 'Congleton', 'Crewe', 'Ellesmere Port', 'Frodsham', 'Knutsford', 'Macclesfield', 'Malpas', 'Middlewich', 'Nantwich', 'Neston', 'Northwich', 'Poynton with Worth', 'Runcorn', 'Sandbach', 'Warrington', 'Widnes', 'Wilmslow', 'Wolsingham', 'Alston', 'Ambleside', 'Appleby in Westmorland', 'Aspatria', 'Barrow in Furness', 'Barrow-in-Furness', 'Bowness on Windermere', 'Bowness-on-Windermere', 'Brampton', 'Broughton in Furness', 'Broughton-in-Furness', 'Carlisle', 'Cleator Moor', 'Cockermouth', 'Dalton in Furness', 'Dalton-in-Furness', 'Egremont', 'Grange over Sands', 'Harrington', 'Kendal', 'Keswick', 'Kirkby Lonsdale', 'Kirkby Stephen', 'Longtown', 'Maryport', 'Millom', 'Milnthorpe', 'Orgill', 'Penrith', 'Sedbergh', 'Silloth', 'Staveley', 'Ulverston', 'Whitehaven', 'Wigton', 'Windermere', 'Wood Green', 'Altrincham', 'Ashton in Makerfield', 'Ashton under Lyne', 'Atherton', 'Audenshaw', 'Blackrod', 'Bolton', 'Bury', 'Cadishead', 'Chadderton', 'Cheadle', 'Cheadle Hulme', 'Denton', 'Droylsden', 'Dukinfield', 'Eccles', 'Failsworth', 'Farnworth', 'Golbourne', 'Heywood', 'Hindley', 'Horwich', 'Hyde', 'Ince in Makerfield', 'Irlam', 'Kearsley', 'Leigh', 'Littleborough', 'Manchester', 'Middleton', 'Milnrow', 'Mossley', 'Oldham', 'Partington', 'Pendlebury', 'Prestwich', 'Radcliffe', 'Ramsbottom', 'Rochdale', 'Royton', 'Salford', 'Salford', 'Shaw and Crompton', 'Stalybridge', 'Stockport', 'Stretford', 'Swinton', 'Tottington', 'Tyldsley', 'Walkden', 'Westhoughton', 'Whitefield', 'Wigan', 'Whitstable', 'Accrington', 'Adlington', 'Bacup', 'Barnoldswick', 'Blackburn', 'Blackpool', 'Brierfield', 'Burnley', 'Carnforth', 'Chorley', 'Clayton le Moors', 'Cleveleys', 'Clitheroe', 'Colne', 'Darwen', 'Failsworth', 'Fleetwood', 'Garstang', 'Great Harwood', 'Haslingden', 'Kirkham', 'Lancaster', 'Leyland', 'Longridge', 'Lytham St Annes', 'Medlar with Wesham', 'Morecambe', 'Nelson', 'Ormskirk', 'Oswaldtwistle', 'Padiham', 'Penwortham', 'Poulton le Fylde', 'Preesall', 'Preston', 'Rawtenstall', 'Skelmersdale', 'Thornton', 'Thornton Cleveleys', 'Wesham', 'Wragby', 'Bebington', 'Birkenhead', 'Bootle', 'Bromborough', 'Crosby', 'Earlestown', 'Formby', 'Halewood', 'Heswall', 'Hoylake', 'Huyton', 'Kirkby', 'Liverpool', 'Speke', 'Maghull', 'Newton le Willows', 'Prescot', 'Rainford', 'Rainhill', 'Southport', 'St Helens', 'St. Helens', 'Wallasey'], 
    'North East': ['Wadebridge', 'Barnard Castle', 'Billingham', 'Bishop Auckland', 'Chester le Street', 'Consett', 'Crook', 'Darlington', 'Durham', 'Eaglescliffe', 'Eastington', 'Ferryhill', 'Greater Willington', 'Hartlepool', 'Newton Aycliffe', 'Peterlee', 'Seaham', 'Sedgefield', 'Shildon', 'Spennymoor', 'Stanhope', 'Stanley', 'Stockton on Tees', 'Tow Law', 'Willington', 'Wellingborough', 'Alnwick', 'Amble', 'Ashington', 'Bedlington', 'Berwick upon Tweed', 'Blyth', 'Corbridge', 'Cramlington', 'Haltwhistle', 'Hexham', 'Morpeth', 'Newbiggin by the Sea', 'Ponteland', 'Prudhoe', 'Rothbury', 'West Bedlington', 'Birtley', 'Blaydon on tyne', 'Cullercoats', 'Darsley Park', 'Dunston', 'Gateshead', 'Hetton', 'Houghton le Spring', 'Howdon', 'Jarrow', 'Killingworth', 'Little Benton', 'Longbenton', 'Low Fell', 'Newcastle upon Tyne', 'Newcastle-upon-Tyne', 'North Shields', 'Ryton', 'Sheriff Hill', 'South Shields', 'Sunderland', 'Penshaw', 'Tynemouth', 'Wallsend', 'Washington', 'Whitley Bay', 'Willington Quay', 'Windy Nook'],
    'Yorkshire and the Humber': ['Wimborne Minster', 'Beverley', 'Bridlington', 'Brough', 'Driffield', 'Goole', 'Hedon', 'Hessle', 'Hornsea', 'Market Weighton', 'Pocklington', 'Snaith', 'South Cave', 'Wigston Magna', 'Alford', 'Barton upon Humber', 'Boston', 'Bottesford', 'Bourne', 'Brigg', 'Broughton', 'Burgh le Marsh', 'Caistor', 'Cleethorpes', 'Coningsby', 'Crowland', 'Crowle', 'Epworth', 'Gainsborough', 'Grantham', 'Grimsby', 'Holbeach', 'Horncastle', 'Immingham', 'Kirton in Lindsey', 'Lincoln', 'Little Coates', 'Long Sutton', 'Louth', 'Mablethorpe', 'Mablethorpe and Sutton', 'Market Deeping', 'Market Rasen', 'North Hykeham', 'Scunthorpe', 'Skegness', 'Sleaford', 'Spalding', 'Spilsby', 'Stamford', 'The Deepings', 'Wainfleet', 'Winterton', 'Wymondham', 'Bedale', 'Bentham', 'Boroughbridge', 'Colburn', 'Easingwold', 'Eston', 'Filey', 'Grangetown', 'Grassington', 'Guisborough', 'Harrogate', 'Hawes', 'Haxby', 'Helmsley', 'Ingleby Barwick', 'Kirkbymoorside', 'Knaresborough', 'Leyburn', 'Loftus', 'Malton', 'Masham', 'Middleham', 'Middlesbrough', 'Northallerton', 'Norton on Derwent', 'Pateley Bridge', 'Pickering', 'Redcar', 'Richmond', 'Ripon', "Robin Hood's Bay", 'Saltburn by the Sea', 'Scarborough', 'Selby', 'Settle', 'Sherburn in Elmet', 'Skelton in Cleveland', 'Skipton', 'Stockton on Tees', 'Stokesley', 'Tadcaster', 'Thirsk', 'Thornaby on Tees', 'Whitby', 'Yarm', 'Yeovil', 'Anston', 'Askern', 'Barnsley', 'Bawtry', 'Brierley', 'Conisbrough', 'Dinnington', 'Doncaster', 'Edlington', 'Hatfield', 'Hoyland', 'Maltby', 'Mexborough', 'Penistone', 'Rotherham', 'Sheffield', 'Stainforth', 'Stocksbridge', 'Swinton', 'Thorne', 'Tickhill', 'Wath upon Dearne', 'Baildon', 'Batley', 'Bingley', 'Bradford', 'Brighouse', 'Castleford', 'Cleckheaton', 'Denholme', 'Dewsbury', 'Elland', 'Farsley', 'Featherstone', 'Garforth', 'Guiseley', 'Halifax', 'Hebden Bridge', 'Hebden Royd', 'Heckmondwike', 'Hemsworth', 'Holmfirth', 'Horsforth', 'Huddersfield', 'Ilkley', 'Keighley', 'Knottingley', 'Leeds', 'Meltham', 'Hull', 'Kingston Upon Hull', 'Kingston-Upon-Hull', 'Mirfield', 'Morley', 'Mytholmroyd', 'Normanton', 'Ossett', 'Otley', 'Pontefract', 'Pudsey', 'Rothwell', 'Shipley', 'Silsden', 'South Elmsall', 'South Kirkby and Moorthorpe', 'Sowerby Bridge', 'Todmorden', 'Wakefield', 'Wetherby', 'Yeadon'],
    'East Midlands': ['Workington', 'Alfreton', 'Ashbourne', 'Bakewell', 'Barrow Hill and Whittington', 'Belper', 'Bolsover', 'Buxton', 'Chapel en le Frith', 'Chapel-en-le-Frith', 'Chesterfield', 'Clay Cross', 'Darley Dale', 'Derby', 'Dronfield', 'Dronfield Woodhouse', 'Eckington', 'Fairfield', 'Glossop', 'Hadfield', 'Heanor', 'Ilkeston', 'Killamarsh', 'Langley Mill', 'Long Eaton', 'Matlock', 'Melbourne', 'Netherthorpe', 'New Mills', 'Over Woodhouse', 'Ripley', 'Sandiacre', 'Shallcross', 'Shirebrook', 'Staveley', 'Swadlincote', 'Whaley Bridge', 'Whitworth', 'Ashby de la Zouch', 'Ashby Woulds', 'Braunstone Town', 'Coalville', 'Earl Shilton', 'Hinckley', 'Leicester', 'Loughborough', 'Lutterworth', 'Market Bosworth', 'Market Harborough', 'Melton Mowbray', 'Oadby', 'Shepshed', 'Syston', 'York', 'Brackley', 'Burton Latimer', 'Corby', 'Daventry', 'Desborough', 'Higham Ferrers', 'Irthlingborough', 'Kettering', 'Northampton', 'Oundle', 'Raunds', 'Rothwell', 'Rushden', 'Thrapston', 'Towcester', 'Wooler', 'Arnold', 'Beeston', 'Bingham', 'Bracebridge', 'Bulwell', 'Carlton', 'Cotgrave', 'East Retford', 'Eastwood', 'Harworth and Bircotes', 'Hucknall', 'Kilton', 'Kimberley', 'Kirkby in Ashfield', 'Mansfield', 'Netherfield', 'Newark on Trent', 'Nottingham', 'Ollerton', 'Ollerton and Boughton', 'Retford', 'Southwell', 'Stapleford', 'Sutton in Ashfield', 'Warsop', 'West Bridgefield', 'Woodstock', 'Oakham'],
    'West Midlands': ['Uppingham', "Bishop's Castle", 'Bridgnorth', 'Broseley', 'Church Stretton', 'Cleobury Mortimer', 'Clun', 'Craven Arms', 'Dawley', 'Ludlow', 'Madeley', 'Market Drayton', 'Much Wenlock', 'Newport', 'Oakengates', 'Oswestry', 'Shifnal', 'Shrewsbury', 'Telford', 'Wellington', 'Wem', 'Wombwell', 'Alton', 'Biddulph', 'Burntwood', 'Burslem', 'Burton upon Trent', 'Burton-upon-Trent', 'Cannock', 'Cheadle', 'Eccleshall', 'Fazeley', 'Fenton', 'Hednesford', 'Burton on Trent', 'Burton-on-Trent', 'Kidsgrove', 'Leek', 'Lichfield', 'Longton', 'Newcastle-under-Lyme', 'Newcastle under Lyme', 'Penkridge', 'Perry Crofts', 'Rugeley', 'Stafford', 'Stoke on Trent', 'Stoke-on-Trent', 'Stoke', 'Tamworth', 'Tunstall', 'Uttoxeter', 'Alcester', 'Atherstone', 'Bedworth', 'Coleshill', 'Henley in Arden', 'Kenilworth', 'Middle Quinton', 'Nuneaton', 'Royal Leamington Spa', 'Rugby', 'Shipston on Stour', 'Shipston-on-Stour', 'Southam', 'Stratford upon Avon', 'Stratford-upon-Avon', 'Warwick', 'Whitnash', 'Aldridge', 'Bilston', 'Birmingham', 'Blackheath', 'Bloxwich', 'Brierley Hill', 'Brownhills', 'Coal Pool', 'Coseley', 'Coventry', 'Cradley Heath', 'Darlaston', 'Dudley', 'Fordbridge', 'Gornal', 'Halesowen', 'Lye', 'Moxley', 'Netherton', 'Oldbury', 'Pelsall', 'Rowley Regis', 'Sedgley', 'Smethwick', 'Solihull', 'Stourbridge', 'Sutton Coldfield', 'Tipton', 'Walsall', 'Wednesbury', 'Wednesfield', 'West Bromwich', 'Willenhall', 'Wolverhampton', 'Bewdley', 'Bromsgrove', 'Droitwich Spa', 'Evesham', 'Great Malvern', 'Kidderminster', 'Malvern', 'Pershore', 'Redditch', 'Stourport on Severn', 'Tenbury Wells', 'Upton upon Severn', 'Worcester'],
    'East of England': ['Norfolk', 'Ampthill', 'Arlesey', 'Bedford', 'Biggleswade', 'Dunstable', 'Flitwick', 'Houghton Regis', 'Kempston', 'Leighton Buzzard', 'Linslade', 'Luton', 'Potton', 'Sandy', 'Shefford', 'Stotfold', 'Wixams', 'Wolverton and Greenleys', 'Cambridge', 'Chatteris', 'Fulbourn', 'Godmanchester', 'Hanley Grange', 'Huntingdon', 'Northstowe', 'Peterborough', 'Ramsey', 'Soham', 'St Ives', 'St Neots', 'Whittlesey', 'Winchelsea', 'Basildon', 'Billericay', 'Braintree', 'Brentwood', 'Brightlingsea', 'Buckhurst Hill', 'Burnham on Crouch', 'Canvey Island', 'Chafford Hundred', 'Chelmsford', 'Clackwell', 'Clacton on Sea', 'Coggeshall', 'Colchester', 'Corringham', 'Dovercourt', 'Eastwood', 'Epping', 'Frinton on Sea', 'Great Dunmow', 'Hadleigh', 'Halstead', 'Harlow', 'Harwich', 'Heybridge', 'Hockley', 'Holland on Sea', 'Ingatestone', 'Laindon', 'Langdon Hills', 'Leigh on Sea', 'Loughton', 'Maldon', 'Manningtree', 'North Shoebury', 'Parkeston', 'Pitsea', 'Prettlewell', 'Rayleigh', 'Rochford', 'Romford', 'Saffron Walden', 'Shoeburyness', 'South Benfleet', 'South Woodham Ferrers', 'Southchurch', 'Southend on Sea', 'Southminster', 'Stanfield le Hope', 'Thaxted', 'Thorpe Bay', 'Tilbury', 'Waltham Abbey', 'Walton on the Naze', 'West Mersea', 'West Thurrock', 'West Tilbury', 'Westcliff on Sea', 'Wickford', 'Witham', 'Bromyard', 'Hatfield', 'Hereford', 'Kington', 'Ledbury', 'Leominster', 'Longtown', 'Ross on Wye', 'Baldock', 'Barnet', 'Berkhamsted', "Bishop's Stortford", 'Borehamwood', 'Broxbourne', 'Buntingford', 'Bushey', 'Cheshunt', 'Chorleywood', 'Elstree', 'Harpenden', 'Hatfield', 'Hemel Hempstead', 'Hertford', 'Hitchin', 'Hoddesdon', 'Letchworth', 'Potters Bar', 'Rickmansworth', 'Royston', 'Sawbridgeworth', 'Stevenage', 'Tring', 'Waltham Cross', 'Watford', 'Whiston', 'Attleborough', 'Aylsham', 'Caister on Sea', 'Cromer', 'Dereham', 'Downham Market', 'Fakenham', 'Gorleston', 'Great Yarmouth', 'Hingham', 'Hunstanton', "King's Lynn", 'Loddon', 'North Walsham', 'Norwich', 'Rackheath', 'Redenhall with Harleston', 'Reepham', 'Sheringham', 'Stalham', 'Swaffham', 'Thetford', 'Thorpe St Andrew', 'Watton', 'Wells next the Sea', 'Wroxham', 'Aldeburgh', 'Beccles', 'Brandon', 'Bungay', 'Bury St Edmunds', 'Carlton Colville', 'Clare', 'Dommoc', 'Dunwich', 'Felixstowe', 'Framlingham', 'Hadleigh', 'Halesworth', 'Haverhill', 'Ipswich', 'Kesgrave', 'Leiston', 'Lowestoft', 'Mildenhall', 'Needham Market', 'Newmarket', 'Orford', 'Otley', 'Saxmundham', 'Southwold', 'Stowmarket', 'Sudbury', 'Woodbridge'],
    'London': ['Yate', 'Acton', 'Barking', 'Barnes', 'Beckenham', 'Bexley', 'Brentford', 'Bromley', 'Chingford', 'Croydon', 'Dagenham', 'Ealing', 'East Ham', 'Edgware', 'Edmonton', 'Enfield', 'Erith', 'Finchley', 'Harrow', 'Hendon', 'Hornsey', 'Ilford', 'Kingston upon Thames', 'Leyton', 'Mitcham', 'Richmond', 'Southall', 'Southgate', 'St Mary Cray', 'Surbiton', 'Tottenham', 'Twickenham', 'Uxbridge', 'Walthamstow', 'Wembley', 'West Ham', 'Willesden', 'Wimbledon', 'Abbey Wood', 'Acton', 'Addington', 'Addiscombe', 'Albany Park', 'Aldborough Hatch', 'Aldgate', 'Aldwych', 'Alperton', 'Anerley', 'Aperfield', 'Ardleigh Green', 'Arkley', 'Arnos Grove', 'Balham', 'Bankside', 'Barbican', 'Barking', 'Barkingside', 'Barnehurst', 'Barnes Cray', 'Barnet Gate', 'Barnet', 'Barnsbury', 'Battersea', 'Bayswater', 'Beckenham', 'Beckton', 'Becontree', 'Becontree Heath', 'Beddington', 'Bedford Park', 'Belgravia', 'Bellingham', 'Belsize Park', 'Belvedere', 'Bermondsey', 'Berrylands', 'Bethnal Green', 'Bexley', 'Bexleyheath', 'Bickley', 'Biggin Hill', 'Blackfen', 'Blackfriars', 'Blackheath', 'Blackheath Royal Standard', 'Blackwall', 'Blendon', 'Bloomsbury', 'Botany Bay', 'Bounds Green', 'Bowes Park', 'Brentford', 'Brent Cross', 'Brent Park', 'Brimsdown', 'Brixton', 'Brockley', 'Bromley', 'Bromley', 'Bromley Common', 'Brompton', 'Brondesbury', 'Brunswick Park', 'Bulls Cross', 'Burnt Oak', 'Camberwell', 'Cambridge Heath', 'Camden Town', 'Canary Wharf', 'Cann Hall', 'Canning Town', 'Canonbury', 'Carshalton', 'Castelnau', 'Castle Green', 'Catford', 'Chadwell Heath', 'Chalk Farm', 'Charing Cross', 'Charlton', 'Chase Cross', 'Cheam', 'Chelsea', 'Chelsfield', 'Chessington', 'Childs Hill', 'Chinatown', 'Chinbrook', 'Chingford', 'Chislehurst', 'Chiswick', 'Church End', 'Church End', 'Clapham', 'Clerkenwell', 'Cockfosters', 'Colindale', 'Collier Row', 'Colliers Wood', 'Colney Hatch', 'Colyers', 'Coney Hall', 'Coombe', 'Coombe', 'Coulsdon', 'Covent Garden', 'Cowley', 'Cranford', 'Cranham', 'Crayford', 'Creekmouth', 'Crews Hill', 'Cricklewood', 'Crofton Park', 'Crook Log', 'Crossness', 'Crouch End', 'Croydon', 'Crystal Palace', 'Cubitt Town', 'Cudham', 'Custom House', 'Dagenham', 'Dalston', 'Dartford', 'De Beauvoir Town', 'Denmark Hill', 'Deptford', 'Derry Downs', 'Dollis Hill', 'Downham', 'Dulwich', 'Ealing', 'Earls Court', 'Earlsfield', 'East Barnet', 'East Bedfont', 'East Dulwich', 'East Finchley', 'East Ham', 'East Sheen', 'East Wickham', 'Eastcote', 'Eden Park', 'Edgware', 'Edmonton', 'Eel Pie Island', 'Elephant and Castle', 'Elm Park', 'Elmers End', 'Elmstead', 'Eltham', 'Emerson Park', 'Enfield Highway', 'Enfield Lock', 'Enfield Town', 'Enfield Wash', 'Erith', 'Falconwood', 'Farringdon', 'Feltham', 'Finchley', 'Finsbury', 'Finsbury Park', 'Fitzrovia', 'Foots Cray', 'Forest Gate', 'Forest Hill', 'Forestdale', 'Fortis Green', 'Freezywater', 'Friern Barnet', 'Frognal', 'Fulham', 'Fulwell', 'Gallows Corner', 'Gants Hill', 'Gidea Park', 'Gipsy Hill', 'Goddington', 'Golders Green', 'Goodmayes', 'Gospel Oak', 'Grahame Park', 'Grange Park', 'Greenford', 'Greenwich', 'Grove Park', 'Grove Park', 'Gunnersbury', 'Hackney', 'Hackney Central', 'Hackney Marshes', 'Hackney Wick', 'Hadley Wood', 'Haggerston', 'Hainault', 'The Hale', 'Hammersmith', 'Hampstead', 'Hampstead Garden Suburb', 'Hampton', 'Hampton Hill', 'Hampton Wick', 'Hanwell', 'Hanworth', 'Harefield', 'Harlesden', 'Harlington', 'Harmondsworth', 'Harold Hill', 'Harold Park', 'Harold Wood', 'Harringay', 'Harrow', 'Harrow on the Hill', 'Harrow Weald', 'Hatch End', 'Hatton', 'Havering-atte-Bower', 'Hayes', 'Hazelwood', 'Hendon', 'Herne Hill', 'Heston', 'Highams Park', 'Highbury', 'Highgate', 'Hillingdon', 'Hither Green', 'Holborn', 'Holland Park', 'Holloway', 'Homerton', 'Honor Oak', 'Hornchurch', 'Horn Park', 'Hornsey', 'Hounslow', 'Hoxton', 'The Hyde', 'Ickenham', 'Ilford', 'Isle of Dogs', 'Isleworth', 'Islington', 'Kenley', 'Kennington', 'Kensal Green', 'Kensington', 'Kentish Town', 'Kenton', 'Keston', 'Kidbrooke', 'Kilburn', 'Kingsbury', 'Kingston Vale', 'Kingston upon Thames', 'Knightsbridge', 'Ladywell', 'Lambeth', 'Lamorbey', 'Lampton', 'Lea Bridge', 'Leamouth', 'Leaves Green', 'Lessness Heath', 'Lewisham', 'Leyton', 'Leytonstone', 'Limehouse', 'Lisson Grove', 'Little Ilford', 'Little Venice', 'Locksbottom', 'Longford', 'Longlands', 'Lower Clapton', 'Lower Morden', 'Loxford', 'Maida Vale', 'Malden Rushett', 'Manor House', 'Manor Park', 'Marks Gate', 'Maryland', 'Marylebone (also St Marylebone)', 'Mayfair', 'Maze Hill', 'Merton Park', 'Middle Park', 'Mile End', 'Mill Hill', 'Millbank', 'Millwall', 'Mitcham', 'Monken Hadley', 'Morden', 'Morden Park', 'Mortlake', 'Motspur Park', 'Mottingham', 'Muswell Hill', 'Neasden', 'New Addington', 'New Barnet', 'New Cross', 'New Eltham', 'New Malden', 'New Southgate', 'Newbury Park', 'Newington', 'Nine Elms', 'Noak Hill', 'Norbiton', 'Norbury', 'North Cray', 'North End', 'North Finchley', 'North Harrow', 'North Kensington', 'North Ockendon', 'North Sheen', 'North Woolwich', 'Northolt', 'Northumberland Heath', 'Northwood', 'Norwood Green', 'Notting Hill', 'Nunhead', 'Oakleigh Park', 'Old Coulsdon', 'Old Ford', 'Old Malden', 'Old Oak Common', 'Orpington', 'Osidge', 'Osterley', 'Paddington', 'Palmers Green', 'Park Royal', 'Parsons Green', 'Peckham', 'Penge', 'Pentonville', 'Perivale', 'Petersham', 'Petts Wood', 'Pimlico', 'Pinner', 'Plaistow', 'Plaistow', 'Plumstead', 'Ponders End', 'Poplar', "Pratt's Bottom", 'Primrose Hill', 'Purley', 'Putney', "Queen's Park", 'Queensbury', 'Rainham', 'Ratcliff', 'Rayners Lane', 'Raynes Park', 'Redbridge', 'Richmond', 'Riddlesdown', 'Roehampton', 'Romford', 'Rotherhithe', 'Ruislip', 'Rush Green', 'Ruxley', 'Sanderstead', 'Sands End', 'Selhurst', 'Selsdon', 'Seven Kings', 'Seven Sisters', 'Shacklewell', 'Shadwell', "Shepherd's Bush", 'Shirley', "Shooter's Hill", 'Shoreditch', 'Sidcup', 'Silvertown', 'Sipson', 'Slade Green', 'Snaresbrook', 'Soho', 'Somerstown', 'South Croydon', 'South Hackney', 'South Harrow', 'South Hornchurch', 'South Kensington', 'South Norwood', 'South Ruislip', 'South Wimbledon', 'South Woodford', 'South Tottenham', 'Southend', 'Southall', 'Southborough', 'Southfields', 'Southgate', 'Spitalfields', 'St Helier', "St James's", 'St Margarets', 'St Giles', 'St Johns', "St John's Wood", "St Luke's", 'St Mary Cray', 'St Pancras', "St Paul's Cray", 'Stamford Hill', 'Stanmore', 'Stepney', 'Stockwell', 'Stoke Newington', 'Stonebridge', 'Stratford', 'Strawberry Hill', 'Streatham', 'Stroud Green', 'Sudbury', 'Sundridge', 'Surbiton', 'Surrey Quays', 'Sutton', 'Swiss Cottage', 'Sydenham', 'Sydenham Hill', 'Teddington', 'Temple', 'Temple Fortune', 'Thamesmead', 'Thornton Heath', 'Tokyngton', 'Tolworth', 'Tooting', 'Tooting Bec', 'Tottenham', 'Tottenham Green', 'Tottenham Hale', 'Totteridge', 'Tower Hill', 'Tufnell Park', 'Tulse Hill', 'Turnpike Lane', 'Twickenham', 'Upminster', 'Upminster Bridge', 'Upper Clapton', 'Upper Holloway', 'Upper Norwood', 'Upper Ruxley', 'Upper Walthamstow', 'Upton Park', 'Uxbridge', 'Vauxhall', 'Waddon', 'Wallington', 'Walthamstow', 'Walthamstow Village', 'Walworth', 'Wandsworth', 'Wanstead', 'Wapping', 'Wealdstone', 'Well Hall', 'Welling', 'Wembley', 'Wembley Park', 'Wennington', 'West Brompton', 'West Drayton', 'West Ealing', 'West Green', 'West Hackney', 'West Ham', 'West Hampstead', 'West Harrow', 'West Heath', 'West Hendon', 'West Kensington', 'West Norwood', 'West Wickham', 'Westcombe Park', 'Westminster', 'Whetstone', 'White City', 'Whitechapel', 'Widmore (also Widmore Green)', 'Whitton', 'Willesden', 'Wimbledon', 'Winchmore Hill', 'Wood Green', 'Woodford', 'Woodford Green', 'Woodlands', 'Woodside', 'Woodside Park', 'Woolwich', 'Worcester Park', 'Wormwood Scrubs', 'Yeading', 'Yiewsley', 'Stansted'],
    'South East': ['Thames Ditton', 'Woburn', 'Ascot', 'Bracknell', 'Crowthorne', 'Earley', 'Eton', 'Hungerford', 'Lambourn', 'Maidenhead', 'Newbury', 'Reading', 'Sandhurst', 'Slough', 'Thatcham', 'Windsor', 'Wokingham', 'Bristol', 'Amersham', 'Aylesbury', 'Beaconsfield', 'Bletchley', 'Buckingham', 'Chesham', 'Fenny Stratford', 'High Wycombe', 'Marlow', 'Milton Keynes', 'Newport Pagnell', 'Olney', 'Risborough', 'Stony Stratford', 'Wendover', 'Winslow', 'Woburn Sands', 'Withernsea', 'Bexhill on Sea', 'Brighton', 'Crowborough', 'Eastbourne', 'Hailsham', 'Hastings', 'Heathfield', 'Hove', 'Lewes', 'Newhaven', 'Ore Valley', 'Peacehaven', 'Polegate', 'Seaford', 'Telscombe', 'Uckfield', 'Wadhurst', 'Worsley', 'Aldershot', 'Alton', 'Andover', 'Basingstoke', "Bishop's Waltham", 'Blackwater and Hawley', 'Bordon', 'Eastleigh', 'Emsworth', 'Fareham', 'Farnborough', 'Fleet', 'Fordingbridge', 'Gosport', 'Havant', 'Hedge End', 'Hythe', 'Lee on the Solent', 'Lymington', 'Lyndhurst', 'New Alresford', 'New Milton', 'North Camp', 'Petersfield', 'Portchester', 'Portsmouth', 'Ringwood', 'Romsey', 'Southampton', 'Southsea', 'Southwick', 'Tadley', 'Totton', 'Waterlooville', 'Whitchurch', 'Whitehill', 'Wickham', 'Winchester', 'Yateley', 'Welwyn Garden City', 'Appley', 'Brading', 'Cowes', 'East Cowes', 'Newport', 'Ryde', 'Sandown', 'Shanklin', 'Ventnor', 'Yarmouth', 'Ashford', 'Broadstairs', 'Canterbury', 'Chatham', 'Cranbrook', 'Crayford', 'Dartford', 'Dover', 'Edenbridge', 'Faversham', 'Folkestone', 'Fordwich', 'Gillingham', 'Gravesend', 'Greenhill', 'Herne Bay', 'Hythe', 'Lydd', 'Maidstone', 'Margate', 'Minster', 'New Romney', 'Northfleet', 'Orpington', 'Paddock Wood', 'Queenborough', 'Rainham', 'Ramsgate', 'Rochester', 'Royal Tunbridge Wells', 'Sandwich', 'Sevenoaks', 'Sheerness', 'Sittingbourne', 'Snodland', 'Southborough', 'Strood', 'Swanley', 'Swanscombe and Greenhithe', 'Tenterden', 'Tonbridge', 'Tunbridge Wells', 'West Malling', 'Westerham', 'Westgate on Sea', 'Worksop', 'Abingdon', 'Banbury', 'Bicester', 'Burford', 'Carterton', 'Charlbury', 'Chipping Norton', 'Didcot', 'Dorchester', 'Faringdon', 'Henley on Thames', 'Neithrop', 'Oxford', 'Ruscote', 'Thame', 'Wallingford', 'Wantage', 'Watlington', 'Weston Otmoor', 'Witney', 'Ashford', 'Beltchingley', 'Camberley', 'Chertsey', 'Croydon', 'Dorking', 'Egham', 'Epsom', 'Esher', 'Farnham', 'Godalming', 'Gomshall', 'Gratton', 'Great Brookham', 'Guildford', 'Haslemere', 'Horley', 'Kingston upon Thames', 'Leatherhead', 'Redhill', 'Reigate', 'Southwark', 'Staines upon Thames', 'Walton on Thames', 'Weybridge', 'Woking', 'Arundel', 'Bognor Regis', 'Burgess Hill', 'Chichester', 'Crawley', 'Cuckfield', 'East Grinstead', 'Haywards Heath', 'Horsham', 'Littlehampton', 'Midhurst', 'Petworth', 'Selsey', 'Shoreham by Sea', 'Southwick', 'Steyning', 'Worthing'],
    'South West': ['Woodley', 'Winsford', 'Bodmin', 'Callington', 'Camborne', 'Camelford', 'Charlestown', 'Falmouth', 'Fowey', 'Hayle', 'Helston', 'Launceston', 'Liskeard', 'Lostwithiel', 'Marazion', 'Newlyn', 'Newquay', 'Padstow', 'Penryn', 'Penzance', 'Porthleven', 'Redruth', 'Saltash', 'St Austell', 'St Blazey', 'St Columb Major', 'St Ives', 'St Just', 'St Mawes', 'Stratton', 'Torpoint', 'Truro', 'Wirksworth', 'Ashburton', 'Axminster', 'Bampton', 'Barnstaple', 'Bideford', 'Bovey Tracey', 'Bradninch', 'Brixham', 'Buckfastleigh', 'Budleigh Salterton', 'Chagford', 'Chudleigh', 'Chulmleigh', 'Colyton', 'Crediton', 'Cullompton', 'Dartmouth', 'Dawlish', 'Exeter', 'Exmouth', 'Great Torrington', 'Hartland', 'Hatherleigh', 'Highampton', 'Holsworthy', 'Honiton', 'Ilfracombe', 'Ivybridge', 'Kingsbridge', 'Kingsteignton', 'Lynton', 'Modbury', 'Moretonhampstead', 'Newton Abbot', 'North Tawton', 'Northam', 'Okehampton', 'Ottery St Mary', 'Paignton', 'Plymouth', 'Princetown', 'Salcombe', 'Seaton', 'Sherford', 'Sidmouth', 'South Molton', 'Tavistock', 'Teignmouth', 'Tiverton', 'Topsham', 'Torquay', 'Totnes', 'Beaminster', 'Blandford Forum', 'Bournemouth', 'Bridport', 'Chickerell', 'Christchurch', 'Dorchester', 'Ferndown', 'Gillingham', 'Highcliffe', 'Lyme Regis', 'Poole', 'Portland', 'Shaftesbury', 'Sherborne', 'Stalbridge', 'Sturminster Newton', 'Swanage', 'Verwood', 'Wareham', 'Weymouth', 'Wivenhoe', 'Berkeley', 'Bradley Stoke', 'Cheltenham', 'Chipping Campden', 'Chipping Sodbury', 'Cinderford', 'Cirencester', 'Coleford', 'Dursley', 'Fairford', 'Filton', 'Gloucester', 'Kingswood', 'Lechlade', 'Lydney', 'Minchinhampton', 'Mitcheldean', 'Moreton in Marsh', 'Nailsworth', 'Newent', 'Northleach', 'Painswick', 'Patchway', 'Stonehouse', 'Stow on the Wold', 'Stroud', 'Tetbury', 'Tewkesbury', 'Thornbury', 'Wickwar', 'Winchcombe', 'Wotton under Edge', 'Whitchurch', 'Axbridge', 'Bath', 'Bridgwater', 'Bruton', 'Burnham on Sea', 'Castle Cary', 'Chard', 'Clevedon', 'Crewkerne', 'Dulverton', 'Frome', 'Glastonbury', 'Highbridge', 'Ilminster', 'Keynsham', 'Langport', 'Midsomer Norton', 'Minehead', 'Nailsea', 'North Petherton', 'Norton Radstock', 'Portishead', 'Portishead and North Weston', 'Radstock', 'Shepton Mallet', 'Somerton', 'South Petherton', 'Taunton', 'Watchet', 'Wellington', 'Wells', 'Weston super Mare', 'Wincanton', 'Winsford', 'Wiveliscombe', 'Amesbury', 'Bradford on Avon', 'Calne', 'Chippenham', 'Corsham', 'Cricklade', 'Devizes', 'Highworth', 'Ludgershall', 'Malmesbury', 'Marlborough', 'Melksham', 'Mere', 'Royal Wootton Bassett', 'Salisbury', 'Swindon', 'Tidworth', 'Tisbury', 'Trowbridge', 'Warminster', 'Westbury', 'Wilton'],
    'Scotland': ['Strabane', 'Ballater', 'Banchory', 'Banff', 'Banff and Macduff', 'Boddam', 'Clerkhill', 'Ellon', 'Fraserburgh', 'Huntly', 'Insch', 'Inverbervie', 'Inverurie', 'Kemnay', 'Kintore', 'Laurencekirk', 'Macduff', 'Maud', 'Oldmeldrum', 'Peterhead', 'Portlethen', 'Portsoy', 'Red Cloak', 'Rosehearty', 'Stonehaven', 'Turriff', 'Westhill', 'Arbroath', 'Brechin', 'Carnoustie', 'Forfar', 'Kirriemuir', 'Monifieth', 'Montrose', 'Alloa', 'Alva', 'Clackmannan', 'Dollar', 'Menstrie', 'Tillicoultry', 'Tullibody', 'Annan', 'Castle Douglas', 'Dalbeattie', 'Dumfries', 'Gatehouse of Fleet', 'Gretna', 'Kelloholm', 'Kirkconnel', 'Kirkcudbright', 'Langholm', 'Lochmaben', 'Lockerbie', 'Moffat', 'Monreith', 'Newbridge Drive', 'Newton Stewart', 'Sanquhar', 'Stranraer', 'Thornhill', 'Wigtown', 'Dundee', 'Cockenzie and Port Seton', 'Dunbar', 'Haddington', 'Musselburgh', 'North Berwick', 'Prestonpans', 'Tranent', 'Edinburgh', 'Aberdeen', 'Airth', "Bo'ness", 'Bonnybridge', 'Borrowstounness', 'Carron', 'Denny', 'Duniplace', 'Dunmore', 'Falkirk', 'Grahamston', 'Grangemouth', 'Larbert', 'Stenhousemuir', 'Anstruther', 'Auchtermuchty', 'Balcurvie', 'Ballingry', 'Benarty', 'Buckhaven', 'Burntisland', 'Collydean', 'Cowdenbeath', 'Crail', 'Cupar', 'Dalgety Bay', 'Dunfermline', 'Dysart', 'East Wemyss', 'Falkland', 'Glenrothes', 'Inverkeithing', 'Kelty', 'Kincardine', 'Kinghorn', 'Kinglassie', 'Kirkcaldy', 'Ladybank', 'Letham', 'Leuchars', 'Leven', 'Levenmouth', 'Lochgelly', 'Markinch', 'Methil', 'Newburgh', 'Newport on Tay', 'North Queensferry', 'Pitcoudie', 'Pittenweem', 'Rosyth', 'St Andrews', 'St Monans', 'Tayport', 'Woodhaven', 'Wormit', 'Alness', 'Aviemore', 'Brora', 'Cromarty', 'Dingwall', 'Dornoch', 'Fort William', 'Fortrose', 'Grantown on Spey', 'Invergordon', 'Inverlochy', 'Inverness', 'Kingussie', 'Mallaig', 'Nairn', 'Portree', 'Tain', 'Thurso', 'Ullapool', 'Wick', 'Bathgate', 'Dalkeith', 'Dunbar', 'Edinburgh', 'Haddington', 'Linlithgow', 'Loanhead', 'Musselburgh', 'North Berwick', 'Penicuik', 'Buckie', 'Cullen', 'Dufftown', 'Elgin', 'Forres', 'Keith', 'Lossiemouth', 'Aberfeldy', 'Auchterarder', 'Birnam', 'Blackford', 'Blair Atholl', 'Blairgowrie and Rattray', 'Bridge of Earn', 'Bridge of Tilt', 'Comrie', 'Coupar Angus', 'Crieff', 'Kinross', 'Perth', 'Pitlochry', 'Scone', 'Coldstream', 'Duns', 'Earlston', 'Eyemouth', 'Galashiels', 'Greenlaw', 'Hawick', 'Innerleithen', 'Jedburgh', 'Kelso', 'Lauder', 'Melrose', 'Newtown St Boswells', 'Peebles', 'Selkirk', 'Bridge of Allan', 'Callander', 'Doune', 'Dunblane', 'Stirling', 'Airdrie', 'Ayr', 'Barrhead', 'Bearsden', 'Bellshill', 'Biggar', 'Campbeltown', 'Carluke', 'Clydebank', 'Coatbridge', 'Cumbernauld', 'Dumbarton', 'Dunoon', 'East Kilbride', 'Glasgow', 'Gourock', 'Greenock', 'Hamilton', 'Helensburgh', 'Inveraray', 'Irvine', 'Johnstone', 'Kilbarchan', 'Kilmarnock', 'Kilwinning', 'Lanark', 'Largs', 'Lochgilphead', 'Maybole', 'Milngavie', 'Motherwell', 'Oban', 'Paisley', 'Prestwick', 'Rothesay', 'Rutherglen', 'Saltcoats', 'Tobermory', 'Troon', 'Armadale', 'Ballencrieff', 'Bathgate', 'Blackridge', 'Bridgend', 'Broxburn', 'East Calder', 'Linlithgow', 'Livingston', 'Stoneyburn', 'Whitburn', 'Kirkwall', 'Lerwick', 'Stornoway'],
    'Wales': ['Amlwch', 'Beaumaris', 'Benllech', 'Holyhead', 'Llanfairpwllgwyngyll', 'Llangefni', 'Menai Bridge', 'Ammanford', 'Burry Port', 'Carmarthen', 'Garnant', 'Glanamman', 'Kidwelly', 'Laugharne', 'Llandeilo', 'Llandovery', 'Llanelli', 'Newcastle Emlyn', 'St Clears', 'Whitland', 'Aberaeron', 'Aberystwyth', 'Cardigan', 'Lampeter', 'Llandysul', 'New Quay', 'Tregaron', 'Abergele', 'Colwyn Bay', 'Conwy', 'Deganwy', 'Llandudno', 'Llandudno Junction', 'Llanfairfechan', 'Llanrwst', 'Old Colwyn', 'Penmaenmawr', 'Towyn', 'Carrog', 'Corwen', 'Denbigh', 'Gellifor', 'Llangollen', 'Prestatyn', 'Rhuddlan', 'Rhyl', 'Ruthin', 'St Asaph', 'Bagallit', 'Broughton', 'Buckley', 'Caerwys', "Connah's Quay", 'Ewole', 'Flint', 'Hawarden', 'Holywell', 'Mold', 'Queensferry', 'Saltney', 'Shotton', 'Abertillery', 'Blaina', 'Brynmawr', 'Cwmbran', 'Ebbw Vale', 'Newport', 'Tafarnaubach', 'Tredegar', 'Bala', 'Bangor', 'Barmouth', 'Beaumaris', 'Betws y Coed', 'Blaenau Ffestiniog', 'Caernarfon', 'Conwy', 'Criccieth', 'Dolgellau', 'Ffestiniog', 'Harlech', 'Holyhead', 'Llanberis', 'Llanfachreth', 'Nefyn', 'Porthmadog', 'Pwllheli', 'Tywyn', 'Y Felinheli', 'Aberdare', 'Bridgend', 'Caerphilly', 'Llantrisant', 'Maesteg', 'Merthyr Tydfil', 'Pontypridd', 'Porth', 'Porthcawl', 'Abergavenny', 'Caldicot', 'Chepstow', 'Monmouth', 'Fishguard', 'Goodwick', 'Hakin', 'Haverfordwest', 'Milford Haven', 'Narberth', 'Newport', 'Neyland', 'Pembroke', 'Pembroke Dock', 'St Davids', 'Tenby', 'Brecon', 'Builth Wells', 'Cefnllys', 'Crickhowell', 'Hay on Wye', 'Knighton', 'Llandrindod Wells', 'Llanfair Caereinion', 'Llanfyllin', 'Llangors', 'Llanidloes', 'Llanwrtyd Wells', 'Machynlleth', 'Montgomery', 'Newtown', 'Old Radnor', 'Presteigne', 'Rhayader', 'Talgarth', 'Welshpool', 'Cardiff', 'Cowbridge', 'Llantwit Major', 'Penarth', 'Gorseinon', 'Lliw Valey', 'Neath', 'Port Talbot', 'Swansea', 'Chirk', 'Overton on Dee', 'Rhosllannerchrugog', 'Rhosnesni', 'Wrexham'],
    'Northern Ireland': ['Antrim', 'Ballycastle', 'Ballyclare', 'Ballymena', 'Ballymoney', 'Bushmills', 'Carrickfergus', 'Crumlin', 'Greenisland', 'Larne', 'Lisburn', 'Merville Garden Village', 'Newtownabbey', 'Portrush', 'Randalstown', 'Armagh', 'Craigavon', 'Lurgan', 'Markethill', 'Newry', 'Portadown', 'Ballynahinch', 'Banbridge', 'Bangor', 'Carryduff', 'Castlewellan', 'Comber', 'Donaghadee', 'Doromore', 'Downpatrick', 'Dundonald', 'Holywood', 'Kilkeel', 'Killyleagh', 'Lisburn', 'Newtownards', 'Portaferry', 'Rostrevor', 'Saintfield', 'Warrenpoint', 'Enniskillen', 'Lisnaskea', 'Coleraine', 'Derry', 'Antrim', 'Armagh', 'County Down', 'Fermanagh', 'Belfast', 'Londonderry', 'Tyrone', 'Limavady', 'Magherafelt', 'Portstewart', 'Castlederg', 'Clogher', 'Coalisland', 'Cookstown', 'Dungannon', 'Fintona', 'Fivemiletown', 'Omagh']
}

function getRegion(town){
    town = town.toLowerCase()
    for(var region in townsAndCities){
        for(var place in townsAndCities[region]){
            if(town == townsAndCities[region][place].toLowerCase()){
                return(region)
            }
        }
    }
}




module.exports.townsAndCities = townsAndCities
module.exports.distractions = distractions
module.exports.getRegion = getRegion