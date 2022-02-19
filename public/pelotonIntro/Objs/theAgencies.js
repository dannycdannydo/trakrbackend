const theAgencies = {'Acre Capital': ['acre capital', '@acrellp.com'], 'Acuitus RE': ['acuitus', '@acuitus.co.uk'], 'ADS RE': ['adsre', 'ads re', 'ads real estate', '@adsre.co.uk'], 'AHBN': ['ahbn', '@ahbn.co.uk'],
'Alder King': ['alder king', '@alderking.com'], 'Allsop': ['allsop', '@allsop.co.uk'], 'Automotive Property Consultancy': ['automotive property consultancy', '@automotive-property.com'], 'Atkinson Associates': ['@atkinsonassoc.co.uk', 'atkinson associates'],
'Avison Young': ['avison young', '@avisonyoung.com'], 'AWS Chartered Surveyors': ['@awsltd.co.uk'], 'Adlers Chartered Surveyors': ['Adlers Chartered Surveyors','@adlers.co.uk'], 'Acorn Commercial': ['acorn commercial','@acorn.ltd.uk','acorncommercial.co.uk']
, 'Aitchison Raffety': ['aitchison raffety','argroup.co.uk'], 'Atis Real': ['atis real','@atisreal.com'], 'Aston Rose': ['aston rose','@astonrose.co.uk'], 'APAM': ['apam','@apamuk.com'], 'Angermann Goddard & Lloyd': ['angermann goddard','@agl-london.co.uk']
, 'Ashworth Sibal Welch': ['ashworth sibal','@aswprop.com'], 'Altitude Investments': ['altitude investments','@altitude-investments.com'], 'Amro Commercial': ['amro commercial','@amrocommercial.co.uk']

, 'B8 Real Estate': ['b8 real estate','@b8re.com'], 'Barber Wadlow': ['barber wadlow','@barberwadlow.com'], 'Barnard Marcus': ['barnard marcus','@barnardmarcus.co.uk'],
'Barnard Marcus': ['barnard marcus','@barnardmarcus.co.uk'], 'BC Real Estate': ['bc real estate','@bcrealestate.co.uk'], 'Behr & Co': ['behr & co', 'behrandco', '@behrandco.co.uk'], 'Brackenridge Hanson Tate': ['brackenridge hanson tate','@bht.uk.com'],
'Bidwells': ['bidwells','@bidwells.co.uk'], 'BNP Paribas': ['bnp paribas','@bnpparibas.com'], 'Branch Associates': ['branch associates','@branchassociates.co.uk'], 'Bulleys Bradbury': ['bulleys bradbury','@bulleys.co.uk']
, 'BTW Shiells': ['btw shiells','@btwshiells.co.uk'], 'Buchanan Bond': ['buchanan bond','@buchananbond.com'], 'Barton Kendal': ['barton kendal','@barton-kendal.co.uk'], 'Barnsdales': ['barnsdales','@barnsdales.co.uk']
, 'Butters John Bee': ['butter john bee','@bjbmail.com'], 'Brown Cooper Marples': ['brown cooper marples','@browncoopermarples.com'], 'Banks Long & Co': ['banks long','@bankslong.com']
, 'Boddy & Edwards': ['boddy edwards','@boddyandedwards.co.uk'], 'Briant Champion Long': ['briant champion long','@bclretail.co.uk'], 'Burston Cook': ['burston cook','@burstoncook.co.uk']
, 'Barker Storey Matthews': ['barker storey matthews','@bsm.uk.com'], 'Burley Browne': ['burley browne','@burleybrowne.co.uk'], 'Burbage Realty': ['burbage realty','@burbagerealty.com']
, 'BA Commercial': ['ba commercial','@bacommercial.com'], 'BCM Chartered Surveyors': ['bcm chartered surveyors','@bcmre.com'], 'Buckinghams Commercial': ['buckinghams commercial','@buckinghams-commercial.co.uk']
, 'Bruce Gillingham Pollard': ['bruce gillingham pollard','@brucegillinghampollard.com'], 'Bolton Birch': ['bolton brich','@boltonbirch.com'], 'Bailey Deakin Hamilton': ['bdh property','@bdhproperty.com']
, 'Brown & Lee': ['brown & lee','@brownandlee.com'], 'Barker Proudlove': ['barker proudlove','@barkerproudlove.co.uk'], 'Bond Wolfe': ['bond wolfe','@bondwolfe.net']
, 'Burlington Green Partners': ['burlington green','@burlingtongreen.co.uk'], 'BTC Commercial': ['btc commercial','@btcint.com'], 'Berkeley Brown': ['berkeley brown','@berkeleybrown.com']

, 'Carrick Real Estate': ['carrick real estate','@carrickre.com']
, 'Carter Jonas': ['carter jonas','@carterjonas.co.uk'], 'CBGA Robson LLP': ['cbga robson','@cbgarobson.com', 'cbga.co.uk'], 'CBRE': ['CBRE','@cbre.com'], 'Charles Dixon Property Consultants': ['charles dixon property','@charlesdixonassetmanagement.co.uk'], 'Christopher Dee': ['christopher dee','@christopherdee.co.uk','chris bathurst', 'chris jones',
'chris dudhill'], 'Christie & Co': ['christie & co', 'christie and co','@christie.com'], 'Colliers': ['colliers','@colliers.com'], 'Commercial Property Partners': ['Commercial Property Partners','@cppartners.co.uk'], 'Cooke & Arkwright': ['cooke & arkwright','@coark.com']
, 'Cortex Partners': ['cortex partners','@cortexpartners.co.uk'], 'Cushman & Wakefield': ['cushman & wakefield','cushman and wakefield','dtz','@cushwake.com','@dtz.com'], 'Chapman Petrie': ['chapman petrie','@chapman-petrie.co.uk']
, 'CWM Partners': ['cwm partners','@cwm.co.uk'], 'Coffer Corporate': ['coffer corporate','@cocol.co.uk'], 'Capita': ['@capita.co.uk', 'capitasymonds.co.uk'], 'Collingwood Rigby': ['collingwood rigby','@collingwoodrigby.co.uk']
, 'Cooper Rose Real Estate': ['Cooper Rose','@crre.co.uk'], 'Crossland Otter Hunt': ['crossland otter hunt','@coh.eu'], 'Cheetham Mortimer': ['cheetham mortimer','@cheetham-mortimer.com'], 'Celt Rowlands & Co': ['celt rowlands','@celtrowlands.com']
, 'Cuthbert White': ['cuthbert white','@cuthbertwhite.com'], 'Carter Towler': ['carter towler','@cartertowler.co.uk'], 'Cradick Retail': ['cradick retail','@cradick.co.uk'], 'Colin Walker & Company': ['colin walker','@colinwalker.co.uk']
, 'CKD Galbraith': ['ckd galbraith','@ckdgalbraith.co.uk'], 'Coulter Commercial': ['coulter commercial','@coultercommercial.com'], 'CorProp': ['corprop','@corprop.co.uk'], 'Commercial Properties': ['commercial properties ltd','@commercialpropertiesltd.co.uk', 'gary scorah']
, 'Cluttons': ['Cluttons','@cluttons.com'], 'Carigiet Cowen': ['carigiet cowen','@carigietowen.co.uk'], 'Churston Heard': ['churston heard','@churstonheard.co.uk'], 'Curson Sowerby': ['curson sowerby','@cspretail.co.uk'], 'Cannon Capital': ['cannon capital','@cannoncapital.co.uk']
, 'Cyril Leonard': ['cyril leonard','@cyrilleonard.co.uk'], 'Claridges Commercial': ['claridges commercial','@claridges-commercial.co.uk'], 'Cottrell Commercial': ['cottrell commercial','@cottrellcommercial.co.uk']
, 'Central Retail Chartered Surveyors': ['central retail chartered surveyors','@central-retail.co.uk'], 'Camplin Bianco': ['camplin bianco','@camplinbianco.com'], 'Clay Street Property Investment Consultants': ['clay street property','@claystreet.co.uk']
, 'Crane Reid': ['crane reid','@cranereid.com'], 'Chase and Partners': ['chase and partners','@chaseandpartners.co.uk'], 'Cooper Chen': ['cooper chen','@cooperchen.co.uk']

, 'Davies Harrison RE': ['davies harrison','@daviesharrison.com'], 'David Baroukh Associates': ['david baroukh','@dpaprop.co.uk'], 'DTRE': ['dtre','@dtre.com'], 'Doherty Baines': ['doherty baines','@dohertybaines.com']
, 'Deloitte Real Estate': ['deloitte','@deloitte.co.uk','driversjonas.com'], 'Dacres Commercial': ['dacres commercial','@dacres.co.uk'], 'Daniel Watney': ['daniel watney','@danielwatney.co.uk'], 'Dixon Wimbush': ['dixon wimbush','@dixonwimbush.co.uk']
, 'Douglas Stevens': ['douglas stevens','@douglasstevens.co.uk'], 'DCLM Commercial Property': ['dclm commercial property','@dclmcp.com'], 'D&P Kein': ['d&p klein','@kleinonline.co.uk']
, 'Donaldsons': ['donaldsons','@donaldsons.co.uk'], 'Dunlop Heywood Lorenz': ['dunlop heywood lorenz'], 'Dunitz & Co': ['dunitz and co','@dunitzandco.com'], 'DGI Davis George': ['dgi davis george','@dgi-davisgeorge.co.uk']
, 'De Souza': ['de souza','@desouza.co.uk'], 'Dexter Wood': ['dexter wood','@dexterwood.co.uk'], 'Dears Brack Commercial': ['dears brack'], 'Davis Brown Chartered Surveyors': ['davis brown','@davis-brown.co.uk']
, 'Duxburys Commercial': ['duxburys commercial','@duxburyscommercial.com'], 'David Currie': ['david currie','@davidcurrie.co.uk'], 'Dresler Smith': ['dresler smith','@dreslersmith.co.uk']

, 'Eckersley Property': ['eckersley property','@eckersleyproperty.co.uk'], 'Egan Property AM': ['egan property','@egan-pam.com'], 'Ereira Mendoza': ['ereira mendoza','@ereieramendoza.co.uk'], 'Estate-Office': ['estate-office','@estate-office.com'], 'Everton Phillips': ['everton phillips','@evertonphillips.com']
, 'Exclusive Property Sales': ['exclusive property sales','@exclusivepropertysales.co.uk'], 'ES Group': ['es group','@es-group.com'], 'Eddisons': ['eddisons','@eddisons.co.uk'], 'Edwards & Co': ['edwards & co','@edwardsandco.com']
, 'Edward Symmons': ['edward symmons','@edwardsymmons.com'], 'Eric Young & Co': ['eric young','@eyco.co.uk'], 'EJ Hales': ['ej hales','@ejhales.co.uk'], 'Edwin Hill': ['edwin hill','@edwinhill.co.uk'], 'Emanuel Jones': ['emanuel jones, @emanuel-jones.co.uk']
, 'Emanuel Oliver': ['emanuel oliver','@emanueloliver.com'], 'Edgerley Simpson Howe': ['edgerley simpson howe'], 'Everett Newlyn': ['everett newlyn','@everettnewlyn.co.uk'], 'Edwin Thompson': ['edwin thompson','@edwin-thompson.co.uk']

, 'Fineman Ross': ['fineman ross','@finemanross.co.uk'], 'Fisher German': ['fisher german','@fishergerman.co.uk'], 'Finn & Company': ['finn & company', 'finn and company','@finnandcompany.co.uk'], 'Fifield Glyn': ['fifield glyn','@fifieldglyn.com']
, 'Fletcher King': ['fletcher king','@fletcherking.co.uk'], 'Franck-Steier Price': ['franck-steier','@fspproperty.co.uk'], 'Fawcett Mead': ['fawcett mead','@fawcettmead.co.uk'], 'Fox Lloyd Jones': ['fox lloyd jones','@fljlitd.co.uk']
, 'Fisher Hargreaves Proctor': ['fisher hargreaves proctor','@fhp.co.uk'], 'Fearnie Greaves': ['fearnie greaves','@fearniegreaves.co.uk'], 'Franc Warwick': ['franc warwick','@franc-warwick.co.uk']
, 'Flude Commercial': ['flude commercial','@flude.com'], 'FG Burnett': ['fg burnett','@fgburnett.co.uk'], 'Fawley Watson Booth': ['fawley watson booth','@fawleywatsonbooth.com'], 'Fleurets': ['fleurets','@fleurets.com']
, 'Fisk & Co': ['fisk and co','@fiskandco.com'], 'Frost Meadowcroft': ['frost meadowcroft', '@frostmeadowcroft.com']

, 'Garness Jones': ['garness jones','@garnessjones.co.uk'], 'GC Real Estate': ['gc real estate', '@gcrealestate.co.uk', 'George Collins'], 'Gerald Eve': ['gerald eve','@geraldeve.com'], 'Graham Sibbald': ['graham sibbald','@g-s.co.uk'], 'Green & Partners': ['green & partners','green and partners','@greenpartners.co.uk']
, 'GVA (Avison Young)': ['@gva.co.uk', 'gva grimley', 'gvagrimley.co.uk'], 'Gent Visick': ['gent visick','@gentvisick.com'], 'GCW Retail': ['gcw retail','@gcw.co.uk'], 'GBR Phoenix Board': ['gbr phoenix board','@gbrpb.com','@gbrpc.com']
, 'Godfrey Vaughan': ['godfrey vaughan','@godfreyvaughan.co.uk'], 'Griffiths Eccles': ['griffiths eccles','@griffithseccles.com'], 'GL Hearn': ['gl hearn','@glhearn.com']
, 'Glenny': ['glenny','@glenny.co.uk'], 'Goadsby': ['goadsby','@goadsby.com'], 'Gilfillan Property': ['gilfillan property','@gilfillanproperty.com'], 'Goldenberg Real Estate': ['goldenberg real estate','@goldenberg.co.uk']
, 'Goodall Investments': ['goodall investments','@goodallinvestments.co.uk']

, 'Hector Real Estate': ['hector real estate', '@hectorrep.com'], 'Harris Lamb': ['harris lamb','@harrislamb.com'], 'Hartnell Taylor Cook': ['hartnell taylor cook','@htc.uk.com'], 'Harworth Group': ['harworth group','@harworthgroup.com']
, 'Hoddell Stotesbury Morgan': ['hoddell stotesbury', '@hsmuk.com'], 'Helicon Projects': ['helicon projects','heliconprojects'], 'Heywood & Partners': ['heywood & partners','@heywood-p.co.uk']
, 'Hague Nicholls': ['hague nicholls','@haguenicholls.com'], 'Harvey Spackfield': ['harvey spackfield','@harveyspackfield.co.uk'], 'Hindley Lawrence': ['hindley lawrence','@hindleylawrence.co.uk']
, 'HRH Retail': ['hrh retail','@hrhretail.com'], 'HP Four': ['hp four','@hpfour.co.uk'], 'Harmer Ray Hoffbrand': ['harmer ray hoffbrand'], 'Hampson Wall': ['hampson wall','@hampsonwall.com']
, 'H2SO': ['h2so','@h2so.com'], 'Hunters Property Investment': ['hunters property investment','@huntersprop.co.uk'], 'Hitchcock & Wright': ['hitchcock & wirght','@hwandp.co.uk'], 'Hallams': ['hallams','@hallams.com']
, 'Harris Associates': ['harris associates','@harrispi.co.uk'], 'Hants Realty': ['hants realty','@hantsrealty.co.uk'], 'Howie Property': ['howie property','@howieproperty.co.uk'], 'Swettenham Real Estate': ['swettenham real estate','@swettenhamrealestate.com']
, 'Hill Woolhouse': ['hill woolhouse','@hillwoolhouse.co.uk'], 'Honeybourne Kenny': ['honeybourne kenny','@honeybournekenny@aol.com'], 'Hoffman Partners': ['hoffman partners','@hoffmanpartners.co.uk']

, 'Inglis Howie': ['inglis howie','@inglishowie.com'], 'ING Real Estate': ['ingrealestate','@ingrealestate.co.uk'], 'Impey': ['impey','@impey.co.uk'], 'Inprio': ['inprio','@inprio.com']
, 'Ian Scott International': ['ian scott international','@ianscott.co.uk'], 'Innes England': ['innes england','@innes-england.com']

, 'Jones Lang LaSalle': ['jones lang lasalle','jll','king sturge','@kingsturge.com','@eu.jll.com'], 'James Andrew International': ['james andrew internatinoal','@jamesandrew.co.uk'], 'Jenics': ['jenics','@jenics.com']
, 'Jones Realty': ['jones realty','@jonesrealty.co.uk'], 'Joiner Cummings': ['joiner cummings','@joinercummings.co.uk'], 'Jackson Criss': ['jackson criss','@jacksoncriss.co.uk']
, 'James Barr': ['james barr','@jamesbarr.co.uk'], 'JMD Investments': ['jmd investments','@sam-llp.com'], 'James A Baker': ['james a baker','@jamesabaker.co.uk']
, 'Johnson Tucker': ['johnson tucker','@johnsontucker.co.uk'], 'Johnson Fellows': ['johnson fellows','@johnsonfellows.co.uk'], 'JSS Egerton': ['jss egerton','@jssegerton.com']
, 'John Arkwright & Co': ['john arkwright','@jarkwright.co.uk'], 'Jones Watts': ['jones watts','@joneswatts.com'], 'James Boatman': ['james boatman','@jamesboatman.co.uk']
, 'Jeremy Rubin & Co': ['jeremy rubin','@jeremyrubin.co.uk']

, 'Kimmre': ['kimmre','@kimmre.com'], 'Knight Frank': ['knight frank','@knightfrank.com'], 'King Street Commercial': ['king street commercial','@kingstreetcommercial.co.uk','@kingstreetcommercial.com'], 'KLM Retail': ['klm retail','@klmretail.com']
, 'KLM Property': ['klm property','@klmproperty.co.uk'], 'Keningtons': ['keningtons','@keningtons.com'], 'KA Property': ['ka property','@kaproperty.com'], 'Kinleigh Folkard and Hayward': ['kinleigh folkard']
, 'Kingsbury': ['kingsbury','@kingsbury-consultants.co.uk'], 'Kemsley Property Consultants': ['kemsley property','@kemsley.com'], 'Keppie Massie': ['keppie massie','@keppiemassie.com']
, 'Kalmars Commercial': ['kalmars commercial','@kalmars.com']

, 'Lambert Smith Hampton': ['lambert smith hampton','@lsh.co.uk'], 'Legat Owen': ['legat owen','@legatowen.co.uk'], 'Landwood Group': ['landwood group','@landwoodgroup.com'], 'Lewis & Partners': ['lewis & partners','lewis and partners', '@lewisandpartners.com']
, 'Lewis Ellis': ['lewis ellis','@lewisellis.co.uk'], 'Lukeman Cave': ['lukeman cave','@lukemancave.co.uk'], 'Lunson Mitchenall': ['lunson mitchenall','@lunson-mitchenall.co.uk'], 'Lindley Mortimer': ['lindley mortimer','@lindleymortimer.co.uk']
, 'Lexicon Commercial': ['lexicon commercial','@lexiconcommercial.com'], 'Lexicon Cole': ['lexicon cole','@lexiconcole.com'], 'Lawson & Partners': ['lawson & partners','@lawsonandpartners.com'], 'Lamb & Swift': ['lamb and swift','@lambandswift.com']
, 'Lisney': ['@lisney-belfast.com', '@lisney.com'], 'LW Estates': ['lw estates','@lwestates.com'], 'Leslie Roberts': ['leslie roberts','@leslieroberts.co.uk'], 'Levy': ['levy llp','@levyllp.co.uk']
, 'Lamonts': ['lamonts','@lamonts.co.uk'], 'LB Real Estate': ['lb realestate','@lb-realestate.co.uk'], 'Lyndon Yeomans': ['lyndon yeomans','@lyndonyeomans.co.uk']
, 'Leslie Perkins': ['leslie perkins','@leslieperkins.co.uk']

, 'Mason Owen': ['mason owen','@masonowen.com'], 'Mathias Perry': ['mathias perry','@mathiasperry.co.uk'], 'Matthews & Goodman': ['matthews & goodman', 'matthews and goodman', '@matthews-goodman.co.uk'], 'Mellersh & Harding': ['mellersh','@mellersh.co.uk']
, 'Metcalf Harland': ['metcalf harland','@mhpi.co.uk'], 'Metis Real Estate': ['metis real estate','@metisrealestate.com'], 'Michael Elliot Property Advisors': ['michael elliot','@michaelelliot.co.uk']
, 'MK2 Real Estate': ['mk2 real estate','@mk2.co.uk'], 'Montagu Evans': ['montagu evans','@montagu-evans.co.uk','@montagu - evans.co.uk'], 'Morgan Williams': ['morgan williams','@morganwilliams.co.uk'], 'Morgan Martin': ['morgan martin','@morganmartin.co.uk']
, 'Mason Partners': ['Mason Partners','@masonpartners.com', 'lee randle', 'tom gibson'], 'Molyneux Rose': ['molyneux rose','@molyrose.co.uk'], 'Macarthur Wilson': ['macarthur wilson','@macarthurwilson.com']
, 'Mann Smith': ['mann smith','@mannsmith.co.uk'], 'M3 Agency': ['m3 agency','@m3agency.co.uk'], 'MMX Retail': ['mmx retail','@mmxretail.co.uk'], 'Miller Commercial': ['miller commercial','@miller-commercial.co.uk']
, 'MWM Property Consultants': ['mwm property','@mwmproperty.co.uk'], 'Mike Curtis & Co': ['mike curtis & co','@mikecurtisandco.com'], 'MP Real Estate': ['mp real estate','@mprealestate.co.uk']
, 'Mason Philips': ['mason philips','@masonphilips.co.uk'], 'Clarke Nicholls & Coombs': ['clarke nicholls & coombs','@cncagency.co.uk'], 'Morgan Leahy Property Investment Group': ['morgan leahy','@morganleahy.com']
, 'Millar Kitching': ['millar kitching','@millarkitching.co.uk']

, 'Naylors Gavin Black': ['naylors gavin black','@naylorsgavinblack.co.uk', '@naylors.co.uk'], 'Nigel Lawrence Partnership': ['nigel lawrence','@nigellawrence.co.uk'], 'North Rae Sanders': ['north rae sanders','@nrsproperty.co.uk']
, 'NB Real Estate': ['nb real estate','@nbrealestate.co.uk'], 'Nolan Redshaw': ['nolan redshaw','@nolanredshaw.co.uk'], 'Nightingale Partners': ['nightingale partners','@nightingalepartners.com']

, 'Ockleston Bailey': ['ockleston bailey','@ocklestonbailey.co.uk'], 'Osborne King': ['osborne king','@osborneking.com'], 'OBI Property': ['obi property','@obiproperty.co.uk']

, 'Prop-Search.com': ['prop-search.com','@prop-search.com'], 'Philips Lockhart Starr': ['philips lockhart starr','philips lockhart','@philipslockhartstarr.co.uk','philipslockhart.co.uk']
, 'Phillips Roth & Co': ['phillips roth','@phillipsroth.co.uk'], 'Paul Adams Associates': ['Paul Adams','@paa-london.co.uk'], 'PrimeRetail Property': ['PrimeRetail','@primeretailproperty.com']
, 'PPH Commercial': ['pph commercial','@pph-commercial.co.uk'], 'Pulse Partnerships': ['pulss partnerships','@pulsepartnerships.co.uk'], 'Philip Gifford & Associates': ['philip gifford','@giffordassociates.co.uk']
, 'Peel Land & Property': ['peel land & property','@peel.co.uk'], 'Pudney Shuttleworth': ['pudney shuttleworth','@pudneyshuttleworth.co.uk'], 'Peter Lund & Partners': ['peter lund','@peterlundandpartners.co.uk']
, 'Pinkus': ['pinkus','@pinkus.co.uk'], 'Paul Nichols & Company': ['Paul Nichols','@paulnichols.com'], 'Poyntons Consultancy': ['poyntons consultancy'], 'Phillips Sutton': ['phillips sutton','@phillipssutton.co.uk']
, 'Picton Jones AM': ['picton jones','@pjassetman.co.uk'], 'Prideview Properties': ['prideview group','prideview properties','@prideviewproperties.co.uk']
, 'Parkdales': ['parkdales','@pakdales.co.uk'], 'Parkingson CPC': ['parkinson cpc','@parkinsoncpc.co.uk'], 'PK3 Agency': ['pk3 agency', '@pk3.agency']

, 'Ryden LLP': ['ryden','@ryden.co.uk'], 'Rapleys': ['rapleys','@rapleys.com','@rapleys.co.uk'], 'Ramsdens Chartered Surveyors': ['ramsdens chartered','@ramsdens.com'], 'Robson Kay': ['robson kay','@robsonkay.co.uk']
, 'Roger Hannah': ['roger hannah','@roger-hannah.co.uk'], 'Rees Denton': ['rees denton','@reesdenton.com'], 'Reid Rose Gregory': ['reid rose gregory','@rrg.co.uk'], 'Riddell TPS': ['riddell tps','@riddelltps.co.uk']
, 'Reith Lambert': ['reith lambert','@reithlambert.co.uk'], 'Rowley Hughes Thompson': ['rowley hughes thompson','@rhtretail.co.uk'], 'Raven Green': ['raven green'], 'Ridley Thaw': ['ridley thaw','@rtllp.co.uk']
, 'Rory Mack Associates': ['rory mack','@rorymack.co.uk'], 'Robert Irving Burns': ['robert irving burns'], 'Regional Property Solutions': ['regional property solutions','@r-p-s.co.uk'], 'Roy Backhouse & Co': ['roy backhouse','@roybackhouse.com']
, 'RY Partnership': ['ry partnership','@rypartnership.co.uk'], 'Robinson Webster': ['robinson webster','@robinsonwebster.co.uk'], 'Rice Henley': ['rice henley','@ricehenley.co.uk']

, 'Savills': ['@savills.com','savills'], 'Savoy Stewart': ['savoy stewart','@savoystewart.co.uk'], 'Singer Vielle': ['singer vielle','@singerviellesales.com'], 'Sixteen Real Estate': ['sixteen real estate','@sixteenrealestate.com'], 'Stiles Harold Williams': ['stiles harold williams']
, 'Steadman Brierley': ['steadman brierley','@steadmanbrierley.co.uk'], 'Stephenson Day': ['stephenson day','@stephensonday.co.uk'], 'Stockford Anderson': ['stockford anderson','@stockfordanderson.com'], 'Stonehill Partners': ['stonehill partners','@stonehillpartners.co.uk']
, 'Strutt & Parker': ['strutt and parker', 'strutt & parker','@struttandparker.com'], 'Stupples Chandler Garvey': ['stupples chandler garvey','@stuppleschandlergarvey.com'], 'Sanderson Weatherall': ['sanderson weatherall', 'sandersonweatherall.com', 'sw.co.uk']
, 'Sheridan Property Consultants': ['seridan property consultants','@sheridanproperty.co.uk'], 'Sint & Co': ['sint & co','@sint.co.uk'], 'Smith Price': ['smith price','@smithprice.co.uk'], 'Spring 4': ['@spring4.com']
, 'Stewart Montrose': ['stewart montrose','@stewartmontrose.com'], 'Springer Nicolas': ['springer nicolas','@springernicolas.co.uk'], 'Smolka Strachan': ['smolkastrachan','@smolkastrachan.com']
, 'Strettons': ['strettons','@strettons.co.uk'], 'Storeys SSP': ['storeys ssp','@storeys-ssp.co.uk'], 'Smith Price RRG': ['@sprrg.co.uk'], 'Suttons': ['suttons']
, 'Sandrove Brahams': ['sandrove brahams','@sandrovebrahams.com'], 'Smiths Chartered Surveyors': ['smiths estate agents','@smithsestateagents.co.uk'], 'Sandover Molloy': ['sandover molloy','@sandover.co.uk']
, 'Shortland Penn & Moore': ['shortland penn','@spmcommercial.com'], 'Space North West': ['space northwest','@ashtenne.co.uk'], 'Stockford Staunton': ['stockford staunton','@stockford-staunton.co.uk']
, 'SC Associates': ['sc associates','@sc-associates.net'], 'Swoffers Commercial': ['swoffers commercial','@swofferscommercial.co.uk'], 'Sandra Davidson': ['sandra davidson','@sandradavidson.com']

, 'TT&G': ['tudor toone', 'tt&g','@ttg-partners.com', '@tudortoone.com'], 'Tushingham Moore': ['tushingham moore','@tushinghammoore.co.uk'], 'TFC Property': ['tfc property','@tfcproperty.com'], 'Telford Property Consultants': ['telford property','@telfordproperty.com']
, 'Taylor Wilcox': ['taylor wilcox','@taylorwilcox.co.uk'], 'Target Follow': ['target follow','@targetfollow.com'], 'Taylor Shaw Roberts': ['taylor shaw','@tsrsurveyors.co.uk'], 'Taylor Weaver': ['taylor weaver','@taylorweaver.co.uk']
, 'Turner Southern': ['turner southern','@turner-southern.co.uk'], 'Taylor & Company': ['taylor and company','@taylorandco.net'], 'Towlers': ['@towlers.net'], 'Thompson Drummon Brown': ['tdb real estate','@tdbre.co.uk']

, 'Vail Williams': ['vail williams','@vailwilliams.com']

, 'Whitmarsh Holt Young': ['whitmarsh holt young','@why50.com'], 'WSB Property': ['wsb property','@wsbproperty.co.uk'], 'WT Gunson': ['wt gunson','@wtgunson.co.uk', 'w t g u n s o n'], 'Winterhill Largo': ['winterhill largo','@winterhilllargo.com']
, 'Woolhouse Real Estate': ['woolhouse real estate','@woolhousere.co.uk'], 'Wilkinson Williams': ['wilkinson williams','@wilkinsonwilliams.co.uk'], 'WHR Property': ['whr property','@whrproperty.co.uk'], 'Wright Silverwood': ['wright silverwood','@wrightsilverwood.co.uk']
, 'Woodward Hall': ['woodward hall','@woodwardhall.co.uk'], 'Windle Beech Winthrop': ['windle beech winthrop','@wbwsurveyors.co.uk'], 'Whitaker Horton': ['whitaker horton','@whitakerhorton.co.uk']
, 'White Druce & Brown': ['white druce & brown','@whitedrucebrown.co.uk'], 'Wimbush Real Estate': ['wimbush real estate'], 'Williams Sillitoe': ['williams sillitoe','@willsill.co.uk'], 'Wadham and Isherwood': ['wadham and isherwood','@wadhamandisherwood.co.uk']
, 'Worthington Owen': ['worthington owen','@worthingtonowen.co.uk'], 'Wildbrook Commercial Real Estate': ['wildbrook commercial','@wildbrookcre.co.uk'], 'Wignall Brownlow': ['wignall brownlow','@wignallbrownlow.co.uk']
, 'Wade Property Consultants': ['wade property consultants','@wadeandcompany.co.uk']

, 'X Real Estate': ['x real estate','@xrealestate.co.uk']

, 'Young & Co': ['young & co','@youngandco.org.uk']

, 'Zaman Roberts': ['zaman roberts','@zamanroberts.com'], 'Zameero': ['zameero','@zameero.com']

}

module.exports.theAgencies = theAgencies