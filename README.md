# Shan He Ji — China Historical Atlas

A Chinese-language interactive overview of territorial changes from Qin to late Qing. The map uses 148 approximate territorial references, while a separate calendar advances year by year. This is an educational browsing aid, not an independently validated scholarly dataset.

## Run

Serve this directory with any static HTTP server, then open index.html. No build or remote runtime dependencies are required.

## Sources and licensing

- Territorial polygons, captions, and rivers: DeanChensj, jiangshan-map, https://github.com/DeanChensj/jiangshan-map (retrieved 2026-10-24), GPL-3.0. Upstream attributes the Historical Atlas of China, CHGIS, Hartwell, and aourednik/historical-basemaps. Specific shapes have not been individually verified against those scholarly sources.
- Natural Earth 110m land, https://www.naturalearthdata.com/, public domain.
- D3 v7, https://d3js.org/, ISC license, Copyright 2010-2023 Mike Bostock.
- This derivative interface, explanations, and geographic reference queries are distributed under GPL-3.0; see LICENSE.txt. Original upstream academic-use restrictions on CHGIS/Hartwell administrative data are not superseded; prefectural and regional layers are excluded here.

## Derivation and limitations

Only main, rival, and protectorate polity layers were retained. The generic neighbor layer was excluded because of inconsistent historical labels. Selected brief military expeditions were removed. A duplicated late-Qing slice is labeled 1911 as an overview of the pre-revolutionary late-Qing spatial order, not the actual control line after the Wuchang uprising. Navigation separates Chu-Han, Xin, and Gengshi stages. Xin begins in 9 CE. Polity labels at 220 CE distinguish the Liu Bei and Sun Quan factions from their later formal dynastic names. Rendering normalizes spherical winding for D3 without changing the distributed GeoJSON. Contemporary city reference points use point-in-polygon queries; they do not imply control of the whole modern province. Some protectorates and peripheral jurisdictions are hatched, but not all indirect administration has been independently classified. Peripheral empires, short-lived regimes and all regional insurgencies are not exhaustively covered.

Territorial-reference navigation follows representative slices. Western Jin appears under Three Kingdoms navigation before 280, Sui coexists with Chen before 589, Yuan's formal title predates the 1279 unified-period navigation, Qing is shown under Ming navigation before 1644, and Wu Zhou is grouped within Tang-period navigation. Cities and mainland coastline are modern reference geometry; historical coastlines are simplified.

## Ethnic and ruling-group annotations

The 177 unique polity names have explicit entries in ethnicities.json. These describe ruling-house, founding leadership or administrative/colonial authority rather than all residents. Historical ethnonyms are not assumed to map directly to current national or ethnic classifications. Contested ancestry, composite layers, the Northern Liang succession, Shatuo foundations, and administrative territories are qualified in the notes. The interface exposes citations when relevant and supports ethnic-name search plus an optional map-label overlay. No ethnic population percentages are inferred.

## Leadership annotations

leaders.json is keyed by stage id and polity title, so identically named regimes can resolve differently by date and context. The 628 stage-polity combinations include 585 with personal names and 43 explicit pending or chronological qualifications. The numbers count combinations, not distinct people. Nominal sovereigns, actual powerholders, regents, ministers and military figures are distinguished by role labels. The base regnal index is attributed to jiangshan-map/lore_data.js; official chronologies, museum entries and additional references are supplied where applicable. Entries are a research aid, not an independently collated primary-source prosopography. Era-year index bounds are not presented as precise reign dates. Future-in-slice leaders and older map labels are explicitly qualified. Known succession-year and regime-identity corrections include 1449 Ming, 1661 Qing, 1911 Qing, pre-649 Nanzhao, pre-937 Dali, post-928 Dachanghe, and early naming of the Resident in Tibet institution.

## Calendar-scaled playback and dynasty waterfall

The calendar-year ordinal excludes year zero. Default playback advances 1/5/10/25 years at a time without skipping the years between border snapshots. An optional territorial-node mode retains the original shape-based browsing. The requested year persists in the URL and does not snap back to the map reference. Reigns, eras, city names, and historical-group context resolve independently at the browsing year. Map geometry remains the preceding available reference and is explicitly labeled with its reference year; reuse does not assert that every intervening boundary stayed unchanged. Dynasty overview bars retain a common global proportional scale.

## Historical city labels

city-names.json contains dated label intervals, source references, qualifications and selected historical coordinates. city-names.js resolves names for the selected browsing year. The default map hides reference cities without a dated entry, while the optional modern-name overlay shows dual labels and explicitly marked modern reference points. Modern reference points remain separate from historical coordinates used in the evidence explorer. City names, seat names and conventional capital names are mixed deliberately and qualified; the table is not an exhaustive official-name chronology. Date intervals are conservative display ranges, and gaps mean unverified, not uninhabited. Qin Xianyang, Han versus Sui-Tang Chang’an, Han-Wei versus Sui-Tang Luoyang, early Beijing versus Yuan Dadu, and Jinyang have separate approximate coordinates. Coordinates are editorial regional markers, not surveyed city boundaries. Per-city citations and notes are exposed in the UI; not every date edge is independently verified against primary records.

## Chronicle-first browsing

The left sidebar has been removed. Dynasty jump controls, proportional reign bars, and period reading stories live below the map, alongside the year slider. A searchable rail of all 148 territorial references remains in a collapsed index. Each chronological card includes a representative year, period, sovereign and source-stage event. The former dynasty waterfall remains in a collapsed overview. The right panel focuses on the browsing-year sovereigns, verified powerholders, reference-map regimes, and dated group context. It no longer renders territorial prose or city reference inventories. chronicle-context.json adds dated context selections; presence does not imply a sovereign state or a complete ethnic census. Existing per-polity ethnic and leadership qualifications remain accessible. The 690–704 snapshots display Wu Zhou rather than the generic Tang navigation group, and the misleading Kaiyuan heading at 702 is normalized to Wu Zhou.

## Source-backed city-name expansion (2026-10-25)

The city table now covers 38 modern reference places with 336 dated display intervals, plus four independently located historical seats or settlements. The 131 source records point to 130 distinct reference URLs, including gazetteers, original historical texts, government histories, museums, CHGIS and specialist scholarship. A source record is a traceable reference, not a claim that every edge date was independently verified against an original archival document. Source-specific summaries flag retrieval limits and conflicting chronologies.

Click a city marker or the header’s place-name evidence button to search modern or historical names, review the label at the selected map snapshot, open its timeline, and follow interval-specific sources. The evidence view uses the map snapshot year rather than implying annual map reconstruction. Unknown periods remain hidden by default. The optional modern overlay explicitly marks modern-only references. Persistent names such as Beijing, Chengdu, Lhasa and late-Qing Harbin are not changed merely to look ancient. City, county, prefectural seat, port, capital designation and translated historical names are identified separately. Regional point coordinates are editorial approximations.

Corrections distinguish Tang Shancheng county at Xining from Shanzhou at Ledu; Han and Sui-Tang Chang’an; old Jinyang, temporary Yuci and new Taiyuan; early Changchun at Xinlicheng from Kuanchengzi; fixed-site Khuree only from 1778; and Anping/Zelandia from Chikan/Provintia. The administrative name Daojiang is not substituted for Chengdu, nor is Ezhou’s Three Kingdoms Wuchang placed at modern Wuhan. Adjacent Suiyuan and Guihua are separate city records.

## Years within dynasties (2026-10-25)

reigns.json contains 183 inclusive annual reign, regency, or regional records, with separate role labels. The 345 era records are reading aids, not exact lunar-to-Gregorian calendar conversions. Reigns and era starts are not interchangeable. Accession-year overlap, short sovereigns, restoration, the Qin counting offset, the 1402 revival of Hongwu dating, the 1661 use of Shunzhi after Xuanye's accession, and Wu Zetian's regency versus imperial title are handled explicitly. Sources include official regnal tables, the Palace Museum, original historical texts and specialist research, alongside the attributed upstream era index. Some source chronologies contain traditional-year conversion issues; qualifications remain in the data. Inherited accession-year era names, fragmentation-period rulers, and regional powerholders remain incomplete. Uncovered annual rulers are not inferred from decades-old map snapshots.

The primary lower view shows proportional reign bars and 40 sourced reading stories. Exact-year events are distinguished from longer-period background, including urban life, agriculture, printing, taxation, education and administration. Story categories are grouped into reading themes. This is a curated starting set, not a complete annual chronicle or a numerical ranking of dynastic prosperity. The territorial-change cards are retained in a collapsed reference index.

## Political endings and succession (2026-10-25)

polity-outcomes.json contains 40 selected events within the displayed timeline, plus a noninteractive 1912 terminal note. Military conquest, dynastic replacement, surrender, coalition conquest, and political collapse are distinct types. Each event links to sources, chiefly original historical texts, museums, and academic institutions. Selection follows the event year; before/after controls compare the nearest preceding and following available territorial references, with explicit reference dates. Missing independent actor polygons are not reconstructed or silently substituted with a much later depiction. Named court endings do not imply every successor or residual polity vanished.

The defeated polity's earlier reference outline is shown with red dashes. Hatching is clipped to the intersection of that earlier area and the named recipient's later reference polygons, which is still schematic rather than an exact annexation survey. Military/coalition arrows point from the named winner toward the defeated actor; surrender arrows reverse direction. All arrows are schematic relations, never troop routes. Dynastic replacement and collapse receive no military arrows. A three-step automatic comparison and manual phase controls preserve the browsing year while changing the explicitly dated reference map. Query parameters event and phase restore the selected comparison. The chronological-years and reign-duration view remains primary; succession cards sit beneath the reign bars.

## Key-event chronicle (2026-10-25)

history-events.json contains 171 selected dated events from 221 BCE to 1911 CE with 147 source records. The right panel now leads with the selected year's events and their historical consequences. When the year has no curated event, explicitly dated previous and following events appear instead; they are never relabeled as contemporary. Sources are expandable per event. This is a curated chronicle rather than an exhaustive annual record.

The lower catalogue supports current-period or whole-timeline browsing, four themes, text search and twelve-item pagination. Event date buttons return to the map at that year. Forty political-ending events link to the existing before/after territorial comparison. The transport offers key-event steps alongside annual and territorial-reference steps; annual progression remains the default. Rulers, actual powerholders, historical ethnic groups and contemporary polities remain in expandable right-panel sections. Clicking a map polity opens its ruler information.

Traditional historical year labels are not exact Gregorian dates. Entries explain important ambiguities, including Zhang Qian's 138/139 BCE departure, the 265/266 Jin succession, the Chanyuan agreement's 1004/1005 chronology, and the 1141 agreement/1142 implementation distinction. Capital capture, court extinction, residual polities, military occupation and later administrative integration are distinguished in event prose. Events do not imply annual border reconstruction.

## Emperor totals and ordinals (2026-10-25)

emperor-lineages.json defines 34 explicit regnal rosters with 21 source records. Counts are derived from the unique named persons in each roster, independently of repeated reign intervals and territorial snapshots. The selected polity's current sovereigns receive a dynasty total and first-accession ordinal in the visible right-panel summary. The full ordered roster expands below the reign bars, highlights the selected year's sovereigns, and provides dynasty-specific inclusion notes and links. Reign bars display the ordinal where space permits; narrow bars retain the information in their tooltip.

Restored rulers retain their original rank (including Ming Yingzong, Tang Zhongzong and Ruizong, and Yuan Wenzong). Same-year successions may show more than one incumbent, consistent with the annual source data. Unknown annual incumbents remain unknown rather than being inferred from the roster. Qin Ziying and Han Ruzi Ying do not receive emperor ordinals. Pre-imperial stages of Liu Bang, Sun Quan, Sima Rui, Nurhaci, Hong Taiji, Kublai, Abaoji and Li Yuanhao carry explicit identity qualifications. Qing's twelve-person conventional imperial lineage includes the posthumously honored Nurhaci and is not described as twelve men all holding the imperial title during life.

The display follows documented dynasty-specific rosters rather than claiming a single universal test of historical legitimacy. Examples include the Sui three-emperor main line, Western Jin's conventional four, Liu Song's conventional eight, the fourteen-person Northern Wei line and the six-person Northern Qi line. Short-lived and alternative claimants excluded from those rosters are identified in notes. Western Han includes both young emperors and Liu He, excludes Ruzi Ying and Empress Lu, and therefore totals fourteen. Tang's twenty-one exclude the separately listed Wu Zhou; Yuan's eleven begin with Kublai; Ming's sixteen exclude the separately continuing Southern Ming courts. Later Liang includes the briefly enthroned Zhu Yougui and totals three.

## Visual reading layer (2026-10-25)

The default reading surface now emphasizes category shapes and colors, selectable polity color chips, explicit actor-to-actor outcome diagrams, and compact event titles. Event narrative, historical consequences and sources remain available within expandable panels. Political outcome map overlays retain before/after controls while moving the long summary into their evidence disclosure. The years-of-life story library is collapsed by default, while the proportional major-dynasty overview is expanded and positioned before the local reign chart.

A four-lane event band below the year axis places all 171 curated events on the same proportional chronology. War circles, political-change diamonds, reform squares and exchange rings use both shape and color; marks expose accessible names and jump to the event year. These selected marks do not measure the true frequency of historical events. The emperor display uses a rank ring and one dot per person in the documented roster; these indicate ordinal position, not reign duration or a numerical assessment of prosperity. Current-year marks and incumbent dots update with the annual cursor, with reduced-motion support.

At overview zoom, map city labels prioritize nine modern reference locations where an ancient label is available; other existing city markers appear at zoom scale 1.55 or higher. The complete underlying place-name records and evidence search are retained. No historical facts, source records, territorial geometry or emperor rosters were removed by this presentation change.

## Smaller city labels (2026-10-25)

City labels now use a subdued grey-green and a 7.5px screen size at overview zoom, with a lighter 1.2px halo. Zoom compensates text and marker scaling: city text grows only gently to a maximum 9px screen size rather than multiplying with the map's zoom factor. City marker size and halo widths stay constant on screen. The existing place-name click targets, historical naming and evidence panel remain intact.

## Continuous annual axis with shared dynasty ranges (2026-10-25)

annual-timeline.js renders all 2,132 historical years from 221 BCE through 1911 CE, omitting year zero. Main playback and previous/next always advance one chronological year, independently of whether an event or territorial snapshot exists. Empty event years remain selectable; the map keeps its dated territorial reference and the right panel shows a quiet-year state with neighboring events behind a disclosure. Recorded event and reference-update marks do not compress intervening years.

The year ruler, annual point row, dynasty intervals, event layers and vertical cursor now live in one shared sheet and horizontal scroll container. Overview shows the whole period; expanded-year mode uses four pixels per year, adds decade labels, and follows the selected year. Dynasty intervals use the same proportional coordinates and inclusive endpoints as the year axis. The view contains Qin, Han, Jin (Western/Eastern segments), Sui, Tang (Wu Zhou marked separately), Song (Northern/Southern segments), Yuan, Ming and Qing. The Song court transition is in 1127; overlapping annual endpoints do not imply two independent Song dynasties lasting beyond that transition. Qing's historical end remains 1912 while the visible segment is clipped at 1911.

Dynasty shortcut cards, the local ruler-duration view, succession cards and the event catalogue remain accessible in a secondary reading disclosure. Main chronology is represented by intervals rather than dynasty cards. The current year and territorial reference year remain distinct in the URL and UI. Tested 1130→1131 with identical territorial path data, explicit selection of the empty event year 1132, overview/detail shared alignment, absence of page-wide overflow, the BCE/CE boundary and timeline endpoints.

## Compact single-screen atlas (2026-10-25)

The desktop atlas now uses a single viewport-height two-column layout. The left column contains the map followed immediately by the dynasty interval diagram, a sparse year ruler and annual playback controls. The right column spans the complete working height and is reserved for the selected year's event and at most the nearest preceding/following events within eighty years, shown as compact dated links. Quiet years retain their own state and whitespace. Default page height was verified at 913px in a 913px-high browser, with no horizontal page overflow. Small screens stack the same regions rather than forcing a desktop canvas.

Dense year-dot and classification tracks are removed from the overview, while all 2,132 annual positions and one-year stepping remain intact. The playback scan line crosses the dynasty ranges; inactive ranges are subdued and the current dynasty/segment lights up. The interval plot is directly above the main time axis, within the map's left column. Duplicate map metadata, large ruler cards and repeated date headings have been removed from the primary surface. The territorial reference date remains visible as a small map caption.

Current emperor ordinal/total is retained as a compact map-header readout. Full imperial rosters and historical browsing open in the library dialog; leaders, practical powerholders and historical ethnic groups open in the people dialog, including through keyboard or pointer selection of a map polity. Opening these dialogs does not lengthen the page. Event and period jumps from the library close it and return to the map. Source and place-name dialogs remain available, and the smaller city labels retain their zoom compensation. All historical datasets and source references are preserved.

## Animated changes and imperial silhouettes (2026-10-25)

AtlasMotion crossfades existing territorial reference groups for 760 milliseconds when the visible snapshot, city naming, ruler identity, era name or political outcome changes. It does not interpolate historical boundaries. Ordinary annual increments update era numbers without replaying unchanged-state animations. Rapid changes cancel and remove the previous fading copy; cloned SVG clip identifiers remain unique. Reduced-motion preferences disable animations.

The right event column now begins with a compact ruler identity and imperial sequence of crowned human silhouettes. Current incumbents are highlighted; annual succession can highlight more than one person, with an explicit same-year note. Identity combines existing title, personal name and annual era where available. The map uses a small accessible person icon rather than printed ruler names, retaining hover and click access. These are schematic symbols, not historically reconstructed portraits or costume. Existing historical datasets and evidence were not changed. Verified quiet-year stability, reference transitions, succession in 57 CE, era in 58 CE, animation cleanup and one-screen desktop height.

## Two-century waterfall grid (2026-10-25)

The compact dynasty waterfall now has subtle horizontal row separators and vertical grid lines at BCE 200, CE 1, CE 200 and each subsequent 200-year mark through CE 1800, plus the visible endpoints. Grid and ruler use the same historical-year scale; the BCE/CE crossing continues to omit year zero. The BCE 200 label is suppressed near the BCE 221 endpoint to avoid overlap while retaining its grid line.

## Prominent map year (2026-10-25)

The current browsing year is now a large fixed overlay in the map upper-left area beside the zoom controls. Chinese CE/BCE labeling distinguishes the era, and the overlay updates annually without zooming with geography. The smaller territorial-reference caption remains separate. The change preserves the compact page layout.

## Clearer dynasty bars (2026-10-25)

Dynasty spans are 10px high rather than 6px, centered within the unchanged 18px row pitch. Inactive and active-row span opacity is increased while the currently selected interval remains fully opaque. Grid spacing, chronological widths and the compact chart height remain unchanged.

## Compact map context and evidence review (2026-10-25)

Ethnic label and map-short fields use “汉” rather than “汉人”; explanatory historical prose is retained. Repeated emperor silhouette rows are removed. A compact ruler card uses the map's left whitespace and retains titles, personal names, era, ordinal, full-roster access and supported practical powerholders. The event column is 280px on desktop, with category icons and compact event cards; long stories and sources expand on demand. Verified viewport 1415×913, map width 1135px, a selected-event card approximately 247×135px, and no extra page height.

All 21 original city-name flags (18 cities) and 43 unresolved leader combinations were reviewed. City, leader and chronology verification JSON files retain per-entry findings and source links; research-review.html makes them readable without exposing raw data structures. Leader coverage now has 603 named combinations and 25 without names, including multi-center or chronologically invalid institutions. Five narrowly supported annual leadership records were added without extrapolating uncertain tenures. Thirteen territorial feature display-title annotations correct institutional or colonial chronology without changing geometry or canonical source keys. The 171-event chronology received a complete index/date review, with 37 core facts or year-boundary issues reopened and six wording/source updates. This does not claim every sentence or boundary has been independently verified.

## Evidence-aware color and clearer annual context (2026-10-25)

The large map year now includes the selected polity's recorded annual era label. Existing annual data supplies exact era numbering, multiple eras within a calendar year, and pre-era regnal labels such as Qin's Shi Huang 26. No local era is invented when records are absent. The ruler card repositions below the year block so wrapped era labels do not overlap it.

Dynasty-colors.json contains nine dynasty families, sixteen periods and fourteen source records. Dynasty fills, timeline spans and contextual accents use readable modern shades informed by the documented color context. Western Han and Tang ranges show their documented internal color changes. Palette evidence distinguishes institutional preference, imperial dress, cultural custom and explicit interface inference; HEX values are modern design choices, not artifact color measurements. A dedicated dialog exposes each period's rationale and citations.

Map territory selection updates the summary in place; a separate detail link/person marker opens the full people dialog. Keyboard and pointer selection share the summary behavior. Event navigation offers explicit previous/next-event buttons while the main transport remains annual. Outcome controls are moved to the map upper-right on desktop so the current year stays visible. Controls, subtle outlines, spacing and hover/focus feedback have been refined within the existing single-screen dimensions. Verified BCE 105→104 color/era change, Wu Zhou 700's two eras, Qing 1911, selected-polity era ownership, palette dialog, and non-overlap of outcome/year regions.

## Xia–Shang–Zhou and pre-imperial extension (2026-10-25)

The annual axis begins at approximately 2070 BCE and retains 3,981 historical-year positions through 1911 CE, without year zero. Xia, Shang and Zhou interval rows precede the existing nine rows; a 14px row pitch keeps the entire atlas within the established desktop screen. Spring and Autumn uses 770–476 BCE and Warring States uses 475–222 BCE as a disclosed periodization. Pre-841 BCE browsing is explicitly an approximate chronology framework.

Eleven early reference stages show documented archaeological sites, royal capitals or an explicitly labeled Central Plains regional reference. The 2070 BCE opening does not place Erlitou at that date or identify it as a proven Xia capital. Erlitou, Zhengzhou Shang city, Yinxu, Feng–Hao and Chengzhou use site/area markers without invented political borders. Spring and Autumn and early Warring States remain an incomplete set of sourced centers, not a full map of all polities. Fourteen 403–222 BCE Warring States territorial stages reuse the same GPL-3.0 upstream, with generic neighbor layers removed and canonical pre-imperial names avoiding confusion with later homonymous dynasties. These source stages combine changes within date ranges and are not exact annual boundaries.

The extension adds 38 sourced events (eight approximate/period anchors), 79 royal chronology records, seven reference-only early-person contexts and nine archaeological/capital site records. Royal years and the Gonghe chronology are not described as imperial era names. All pre-221 rulers are excluded from emperor ordinals, and reference-only Xia/Shang/early-Zhou figures are never presented as certain annual incumbents. Ancient-guide.html and the supporting JSON files disclose the dating, spatial and source limits. Combined totals are 173 reference stages, 209 selected events and 267 annual leadership records. Qin–Qing content is retained.

## Unfilled neighboring context (2026-10-25)

The default-enabled Neighboring Context layer adds dated, unfilled labels for nearby polities, confederations, historical groups and regional administrations. Sixty-one display records reference forty-five source records across the early and late context datasets. These are editorial activity-area anchors and conservative display windows, not surveyed capitals, political boundaries, population distributions, or universally exact founding/extinction years.

The layer uses a small hollow symbol, muted polity name and a second line identifying entity type and historical group. Existing main-map polities are suppressed through canonical/display aliases; duplicate context aliases are also suppressed. Labels avoid the primary polity text, visible city text and map overlays. Lower-priority labels may be omitted when space is insufficient. Names, detailed ethnic descriptions and chronological limits remain in a keyboard-accessible source dialog. The layer can be disabled independently, and its membership participates in the existing bounded map crossfade. Zoom compensation keeps context type modest in size.

Verified six Qin-era labels in 210 BCE (Xiongnu, Donghu, Yuezhi, Qiang groups, Yue groups and ancient Joseon), source dialog and toggle behavior, Tang-era suppression of already colored Tibet/Nanzhao while adding the Later Turkic polity, Balhae and Silla, and date filtering in Song/Qing views. Page height remains 913px at a 1415×913 viewport. Neighboring Korea, Vietnam, Burma and Ryukyu are described as neighboring states or regional contexts rather than uniformly labeled Chinese minority polities.

## Boundary certainty and free timeline scrubbing (2026-10-25)

All existing territorial source polygons are now treated as approximate unless a feature explicitly declares documented boundary certainty and supplies boundary sources. Approximate or unreviewed political outlines use dashed strokes; documented whole boundaries and sourced documented LineString segments use solid strokes. The existing upstream has no segment-level confidence metadata, so this change does not fabricate verified borders. Point/site symbols remain location references, and the pale physical basemap is separate. A compact map legend and source-dialog explanation disclose the distinction. Administrative hatching is independent of boundary certainty.

The annual sheet now accepts pointer capture across dynasty spans, whitespace and year-ruler areas. The scan line has a wider invisible hit target and a visible grab handle. Position maps directly to the complete historical-year scale rather than clamping to the clicked dynasty. Updates coalesce per animation frame; crossfade animations are skipped during active scrubbing for responsive feedback. Native year input and transport remain intact; dynasty-name and event shortcuts retain their original behavior. The accessible cursor supports Left/Right by one year and Home/End for endpoints, with historical-year value text and no year zero.

Browser checks used actual pointer drags: moving the scan line from 374 to 1075; selecting 1653 from blank space in an earlier dynasty's row; dragging from chart whitespace to 844. Keyboard checks confirmed BCE 1 advances to CE 1 and End reaches 1911. No leftover snapshots or drag state remained, and the desktop page stayed 913px high.

## Dated capital markers (2026-10-25)

Added `capitals.json` and `capital-context.js` for dated capital and court roles. Filled stars identify capitals and royal capitals; outlined stars distinguish eastern/summer capitals, retained/secondary capitals, construction phases, and provisional court seats. Short labels use contemporary names. Active capital locations replace the corresponding ordinary city label without depending on the ordinary-city layer. Capital membership participates in map crossfades, and symbols retain modest screen size during zoom.

The initial layer covers major Qin–Qing dynasties, Three Kingdoms, Eastern Jin and principal southern court phases, plus explicitly qualified Zhou urban references. It is not an exhaustive list of every short-lived court. Palace footprints are not inferred from point anchors. The data distinguish Han and Sui–Tang Chang'an, Han–Wei and Sui–Tang Luoyang, Xu county at Zhangpan, and Wu Wuchang at modern Ezhou. Yuan Zhongdu changes to Dadu in 1272; Shangdu is a summer capital. Ming Nanjing becomes the retained capital in 1421; Southern Song Lin'an remains labeled a provisional court seat (xingzai).

Each marker opens dated notes and source links. Migration years use the later annual state; uncertain transition periods remain unfilled rather than inventing a stable seat. Construction versus occupation, institutional capital versus an emperor's temporary refuge, pre-841 approximate chronology, and final-year limitations are disclosed. Browser checks confirmed capital source dialogs, 1420/1421 migration, 1271/1272 naming, Three Kingdoms coexistence, Wu's 265/266 migration, 582/583 Sui relocation, 904 Tang Luoyang, and zoom compensation. Existing annual navigation and compact page layout remain in place.

## Three-row dynasty and period window (2026-10-25)

The waterfall now keeps three neighboring rows visible in a 96px viewport and automatically scrolls as the active dynasty or historical period changes. The complete BCE–1911 horizontal scale, annual cursor, 200-year grids, free pointer scrubbing, and annual transport are preserved. New up/down controls jump to neighboring dynasty/period starts. At the beginning and end, the window clamps to the first or last three rows. Off-window rows are inert and hidden from assistive technology; reduced-motion preferences disable animated scrolling. The timeline panel shrinks from 250px to 194px, returning 56px to the map.

Added explicitly styled retrospective periods: Three Kingdoms (220–280), Northern and Southern Dynasties (420–589), and Five Dynasties and Ten Kingdoms (907–979). Patterned bars and a period badge distinguish these from dynasty rows. A source dialog explains conventional date ranges and overlapping dynasty/period intervals, including the continuation of Ten Kingdoms regimes after Song's establishment. Sources: Beijing Cultural Heritage Bureau's published chronology standard and the Ministry of Education dictionary's historical chronology appendix. Focus follows the active entry with the latest start date; gaps use the nearest interval without extending its displayed range.

Browser validation covered 906→907, 950→960, Three Kingdoms and Northern/Southern periods, the first and last years, neighboring-period buttons, source dialog, and actual pointer scrubbing across periods. The 1415×913 desktop view remains one screen tall and displays exactly three full rows after scrolling settles.

## Map decluttering and structured event relations (2026-10-25)

Removed the map ruler-icon rendering branch and its layer toggle. The selected ruler's map information card, era label, people dialog, and historical leadership data remain available.

Added `event-visual.js` as the shared presentation grammar for current-event cards, nearby-event cards, outcome overlays, and the outcome catalogue. Military conquests show winner and defeated-polity labels separated by crossed-swords SVG artwork. Succession and surrender use directional symbols; collapse does not invent a winner. Date, event type, relationship, and optional context follow the same hierarchy, with sources and longer stories retained in disclosures. The existing overlay/side-panel duplicate-relation suppression remains intact.

Added the external affairs/expansion category and explicitly reclassified 43 existing sourced events, including Qin's establishment of the three Lingnan commanderies. Classification follows contemporary political relations and frontier activity rather than modern borders or ethnicity. Original categories are retained in `previousCategory`; dates, narrative evidence, and source references are unchanged. Ten existing, explicitly documented conquest narratives now carry structured relations, including Qin's defeat of the Yan/Dai remnants in 222 BCE. The capture of Zhao's king in 228 BCE is not mislabeled as the immediate disappearance of all Zhao resistance.

Browser checks verified zero ruler markers or ruler-icon controls, Qin/Yan-Dai relations, Lingnan's external category, Jin's replacement of Wei, Wuyue's surrender to Song, the external-category catalogue filter (43 of 209 records), and the retained one-screen layout.

## Vertical named imperial roster (2026-10-25)

The left map card now lists every member of the selected dynasty's explicit roster vertically, with sequence number, historical title, and personal name. Current-year rulers receive a highlighted row and a textual incumbent marker; all other rows remain gray. No ruler silhouettes were restored. The card's people/ethnicity link and the former roster navigation link are removed; global people and source-library entry points remain. Clicking a row with a verified reign interval jumps to its first accession year. Long rosters scroll within the card and keep the active row visible, preserving the compact map layout.

Added title labels for all 237 members across the existing 34 rosters, reusing sourced reign/leadership labels and the already cited imperial chronology for missing short-lived rulers. These titles identify people retrospectively; they do not create new annual reign intervals. The existing Southern Song nine-emperor main-line count is preserved, with an explicit exclusion note and Song History source for Zhao Fu's brief forced accession during the 1129 Miao-Liu mutiny. The roster remains distinct from a claim that every ruler was universally recognized.

Corrected the calendar alias for the late-Tang map label and Li Yuan's Tang label so existing verified Tang reign intervals can illuminate the roster. Same-year succession intentionally highlights both recorded rulers with a year-granularity note. Checks covered 1137 Gaozong, 1162 Gaozong/Xiaozong succession, 1170 Xiaozong, 903 Zhaozong with automatic roster scrolling, 1599 Shenzong, row navigation, removed card links, and the retained one-screen desktop layout.

## Calligraphic dynasty wordmarks (2026-10-25)

Added nine individually generated transparent PNG wordmarks for Qin, Han, Jin, Sui, Tang, Song, Yuan, Ming, and Qing. The built-in image generation tool produced contemporary ink artworks; no historical collection image or font binary is bundled. Full prompts and output names are retained in `assets/dynasty-lettering/ART-DIRECTION.md`. The PNG assets remain unaltered from generation, including alpha transparency.

The map heading and selected dynasty's imperial-card header now use these wordmarks with readable modern period labels. Emperor names, event text, annual navigation, and map city labels retain their existing text rendering. The card gains a subtle warm-paper background. Han and Jin artwork use the traditional glyphs Han (漢) and Jin (晉). Western/Eastern Han and Northern/Southern Song share their dynasty-family artwork; unrelated Liu Song and retrospective historical periods are not mislabeled as the Song calligraphic tradition. Unsupported families retain plain titles.

A clickable artwork opens a source dialog; the separate `lettering-gallery.html` offers a nine-tile visual catalogue. Museum and academic references are in `dynasty-lettering.json`. The UI consistently describes these as artistic interpretations, not ancient originals, extracted glyphs, exact facsimiles, or the only script of each dynasty. In particular, the Lanting reference is a surviving old copy, the Duobao reference is a later rubbing of a Tang inscription, Danba is classified as regular script, and the Qing court style is one tradition with especially broad use after the mid-Qianlong period. Noncurrent gallery images load lazily. Opening the evidence dialog pauses playback and suppresses background timeline keyboard shortcuts.

Browser checks covered all nine dynasty-family switches, successful image loading, accessible title names, the source dialog, the gallery, preserved emperor counts/highlights, and the 913px one-screen desktop layout. Southern Song's nine roster rows remain visible with its calligraphic card header.

## Dynasty color continuity (2026-10-25)

Map fills, court accents and waterfall bars share a family palette. Western/Eastern Han, Western/Eastern Jin and Northern/Southern Song use related shades of the same hue. Tang retains its ochre hue before and after Wu Zhou and across later ritual color changes; Wu Zhou remains distinct. dynasty-colors.json preserves historical color evidence separately from displayHex/displayName. Shade changes are interface design, not claims of historical ritual reforms at those dates.

## Compressed ancient overview (2026-10-25)

The display axis reserves 5% of its width for the approximate 2070–771 BCE overview; 770 BCE through 1911 receives the remaining 95% at a uniform annual scale. Calendar arithmetic and year-by-year playback retain every year and exclude year zero. Bars, ticks, point positions, slider, cursor and pointer hit testing share the piecewise display scale. The dashed boundary and overview label identify the scale change; 200-year grid spacing continues in the main interval.

## Concurrent court cards (2026-10-25)

Map-reference polities with explicit imperial rosters appear together as compact court cards when two or more coexist. Each card shows its independently resolved annual sovereigns, available era labels, ordinal position and total count; its roster expands independently. Clicking its heading selects the corresponding map polity. Family aliases are resolved and duplicate roster identities are removed. Unsupported annual rulers remain explicitly unresolved, and pre-imperial titles remain qualified. Same-year succession is distinguished from separate simultaneous courts. Single-court layouts retain their existing full vertical roster.

## Directly labeled dynasty spans (2026-10-25)

The three-row waterfall uses contiguous 36px bars. Dynasty or period names are centered on the spans, with whole-dynasty boundary years beside them, and the selected calendar year above the scrub cursor. The separate left dynasty-name column is removed. True proportional span widths, the compressed ancient overview, family colors, interrupted dynasties, three-row auto-follow and annual navigation are retained. Small label backplates may extend beyond very narrow spans for legibility without changing the underlying dates or hit coordinates.

## Years on the throne (2026-10-25)

Active ruler rows and concurrent court summaries show an inclusive calendar-year count from the available accession intervals, with the accession year counted as one. Overlapping source intervals are counted once; separately recorded restoration intervals are accumulated while intervening gaps are excluded. This is not an era-year conversion or an exact elapsed-anniversary duration. A missing matching annual reign interval retains the unnumbered in-office label rather than guessing.

Known transitions from king/khan to emperor (including Sun Quan in 229) use the imperial accession year after that transition, while the earlier title remains qualified in pre-imperial years.

## Compact ruler identities (2026-10-25)

Roster rows join the complete ruler title and personal name with a middle dot (for example, 明太祖 · 朱元璋), eliminating the separate spaced columns. The single-court card is narrowed to 200px on desktop, and concurrent cards are also more compact. Ordinals, current-year tenure labels, full hover/accessibility names and reign-year navigation are retained.

## Clean dynasty card header (2026-10-25)

Calligraphic style descriptors are omitted from the court card header. The artwork, dynasty name, emperor count and clickable source dialog remain.

## Tenure labels for every roster row (2026-10-25)

Every listed ruler now has a tenure field. The active ruler retains the selected-year accession count. Inactive and future rulers show an approximate complete tenure from recorded annual intervals, explicitly prefixed with 约; same-calendar-year reigns show 不足1年. These estimates use annual endpoints, merge overlaps and exclude separately recorded gaps; they are not precise month/day durations. Missing annual intervals show 年数待核, rather than dropping the field or inventing a duration.

Reported totals for Kangxi, Yongzheng, Qianlong and Xuantong follow the Palace Museum court chronology (61, 13, 60 and 3 respectively). Their hover notes distinguish the chronology/era convention from actual Gregorian accession bounds; the original annual reign records are preserved.

## Annual playback frame rates (2026-10-25)

Playback still advances exactly one historical year per update, excluding year zero. Slow/medium/fast target 4/8/16 fps (250/125/62.5ms), with medium selected by default. Changing speed restarts the active timer; pausing clears it. The cursor moves without transition lag during playback. Unchanged map geometry and labels reuse the existing rendered SVG when their source/color/city/capital/neighbor/toggle/layout key is unchanged, while the year, reign counts, eras and chronicle continue to update annually.

## Uncluttered ancient site view (2026-10-25)

The permanent site/approximate-chronology notice is hidden on ancient site-mode maps. Detailed archaeological and chronology qualifications remain in the existing evidence dialogs and data. The separate Warring States reference note is retained.

## Dynasty-colored calligraphic ink (2026-10-25)

Header and court-card wordmarks render in the dynasty palette for their own label and browsing year, including Western/Eastern Han, Jin and Northern/Southern Song shade differences. An SVG color filter preserves the original transparent PNG and its tonal ink texture without modifying the source bitmap. The nine-wordmark gallery uses representative family colors; evidence dialogs retain the source artwork.

## Geographic court layout (2026-10-25)

Concurrent court cards use explicit historical groupings for the Three Kingdoms, Northern/Southern courts and Southern Song rivals. Northern courts occupy the upper row; southern courts occupy the lower row. Wei (or its Western Jin successor) sits above Shu Han on the lower left and Wu on the lower right when present. Western Wei/Northern Zhou precede Eastern Wei/Northern Qi horizontally. A single northern/southern pair stacks in a compact 200px column; a one-versus-two arrangement centers the single card. Mobile preserves the same reading order in one column. Other combinations retain the existing layout rather than guessing a division.

## Stable event navigation footer (2026-10-25)

Previous/next event controls use icon-only arrow buttons with accessible labels and hover titles. Both sit in a fixed-height footer within the event rail, alongside the catalogue link. Event content scrolls independently, so changing story height does not move the controls. Moving to another year returns the content pane to its top. Mobile uses a bounded event panel with the same footer arrangement.

## Centered main chronology axis (2026-10-25)

The active dynasty/period always occupies the middle of the three-row viewport, including the first and last entries using blank padding. The main year track is aligned to that row rather than placed below all three rows. A low-contrast full-history segmented strip provides context outside the current span; hovering an inactive segment shows its dynasty/period and dates in the existing tooltip. The current span remains a full-height labeled bar. Shared year hit testing, the annual keyboard controls, historical proportions, and compressed pre-770 BCE overview remain unchanged.


### Multi-year historical events

Chronicle events may define an inclusive `endYear` alongside their starting `year`. They remain visible in every covered calendar year, expose both endpoints for navigation, and render as intervals in the event library. `startDateLabel`, `endDateLabel`, `durationLabel`, and `dateNote` preserve the precision of the supporting sources. The progress indicator represents annual positions, not exact elapsed days.

The first converted event is the An–Shi Rebellion (755–763): the start is supported to the ninth day of the eleventh lunar month of Tianbao 14; the end is supported to the first lunar month of Baoying 2. No unverified Western calendar conversion is displayed. The Tibetan occupation of Chang’an in 763 remains a separate point event.


### Global jump search

The header search indexes the existing sourced event, period, regnal, and era datasets locally. It accepts signed years and BCE/CE forms within the atlas range, rejects year zero and out-of-range input, and supports arrow selection, Enter, Escape, and the slash shortcut. Matching rulers jump to their first recorded accession year and select the corresponding polity where available; matching eras jump to their recorded starting year. Event results include duration endpoints where recorded. No external search service or invented historical records are used.


### Expanded event reading cards

The chronicle includes 248 selected events. An earlier enrichment added 23 sourced nodes across political succession, institutions, scholarship, technology and diplomacy. Named figures are recorded for 170 events; additional names were drawn only from existing event accounts, with no ruler inferred merely from a date. The `people` list and optional short `brief` are visible in cards and searchable from the header. Full narratives, chronological precision notes and references remain expandable.

The event rail shows up to six unique nearby event boundaries within 80 calendar-year labels, grouped into earlier events (nearest first) and later events. Active intervals stay in the current section and are excluded from nearby duplicates. The fixed navigation footer and independent scrolling keep the page height bounded.


### Context-sensitive Wu identity

Short polity names are resolved within their historical dates. The five-dynasties Wu is Yang Wu, not the Three Kingdoms Sun Wu; its display label, ruler roster, family explanation and annual leadership are separate. Yang Pu is the only Yang Wu ruler counted as an emperor during his lifetime, starting in 927; earlier kings and later posthumous imperial titles are excluded from that count. The annual records distinguish Yang Pu from the Xu family power holders and cite Xin Wudai Shi, volume 61. Later Tang Zhuangzong and Mingzong records now cover 923–933; Mingzong's accession is dated to 926 from Xin Wudai Shi, volume 6.

## Factual audit (2026-10-25)

Reviewed the current 232-event index and checked 277 original reign/power-holder records and 35 dynasty rosters for structural consistency. Targeted evidence corrections and explicit remaining limits are recorded in `chronology-verification.json` and `research-review.html`. Added two power-holder records for Emperor Ruizong and retired Qianlong; this is not a certification of every map boundary or narrative sentence.

## Focused waterfall layout

Neighboring dynasty ranges retain fully opaque family colors. The active row is 64px high and adjacent rows are 20px high on the same proportional year scale. Current segment dates are stacked beneath the name, avoiding separate endpoint captions around narrow periods. The 200-year ruler sits below all three rows; quiet full-history segments remain inside the center axis. First/last dynasty padding, cross-dynasty scrolling and keyboard year stepping were checked in the browser.

## Keyboard dynasty navigation

Arrow Up and Arrow Down share the previous/next dynasty actions and jump to the adjacent dynasty or historical period start. Arrow Left/Right still step by year. Dynasty keys work on the year cursor and ordinary page content, pause playback, stop at either chronology boundary, and defer to editable fields, selectors, search results and open dialogs. Modified arrow shortcuts remain available to the browser.

## Stable court panels during playback

Court panels reconcile text and attributes in place instead of replacing their full HTML every year. Dynasty and ruler keys preserve image nodes, focus, disclosure state and roster scroll positions. Parallel courts bypass the temporary single-court rendering path. Whole-panel opacity and translate animations are disabled for court panels; map and event transitions retain their existing behavior.

## Song court defaults

Northern Song and Southern Song imperial rosters are expanded by default in parallel court panels. Liao, Jin and other peer courts start collapsed. Manual expand/collapse choices persist during year navigation and playback within the session. Geographic court ordering is unchanged.

## Qing regnal identification

Qing roster rows show temple title, familiar regnal name and personal name in that order. Hong Taiji lists Tiancong/Chongde in the complete roster and uses the corresponding phase label in the current-ruler card. Accession-year inherited era dates remain in the separate annual calendar readout. Puyi retains the existing Xuantong Emperor title without repeating Xuantong or inventing a temple name. Qing-only roster spacing accommodates the additional field.

## Default starting year

Opening the atlas without a valid year or stage starts at 770 BCE (the Spring and Autumn opening), and replay after reaching 1911 restarts there. Explicit year/stage links retain their targets, while Xia, Shang and Western Zhou remain reachable through the complete timeline, keyboard and search.

### Pre-imperial ruler cards

Spring and Autumn and Warring States maps show concurrent state cards independently of imperial genealogy rosters. Each card uses the exact polity identifier and the selected calendar year. The Zhou royal court appears first when mapped; other documented rulers precede unresolved records. Unknown annual rulers are explicitly marked rather than inherited from Qin or a snapshot year. Clicking a card selects that state and its calendar. The imperial roster layout resumes at 221 BCE.

### Continuous event chronology

The right-hand event rail mounts all events once in ascending start-year order. Playback updates annual highlights and duration progress in place; it never replaces or fades the rail. A centered current-year guide follows an interpolated position between event-year groups with a single continuously retargeted scroll animation. Half-viewport padding keeps the first and last year groups reachable at the center. Manual scrolling suspends following for three seconds; clicking the year guide resumes it. Reduced-motion preferences use immediate positioning. Event disclosures, references and year/map links remain available.

### Northern and Southern Dynasties annual coverage review

The 2026-10-26 update adds 101 annual ruler, rival-claimant, map-bridge and power-holder records. The annual dataset now contains 380 records. All 461 polity/year pairs in the atlas frames used for 420–589 have a named ruler; this is a completeness check, not a claim that every border or historical detail is independently verified. Main Southern and Northern dynastic reigns, Western Liang, Xia, Northern Yan and Northern Liang are covered, together with missing Five Dynasties main-court entries. Sources and limitations are recorded in chronology-verification.json and research-review.html. Succession years can include multiple rulers; rival claimants are not described as an exclusively sequential succession. Late traditional-calendar years can cross Gregorian January/February, and explicit carryover eras do not increment automatically. Unnamed temporary appointees remain explicitly unnamed. A compact peer card can show researched rulers without inventing a complete imperial genealogy.

## Capital relocation review

The capital-change pass adds 16 sourced chronology entries and links six existing events to capital-change metadata. Formal relocation, return, provisional court seat, dual-capital construction and renaming receive distinct visual labels. A compact origin-to-destination row appears in each event; annual map arrows indicate direction only and do not reconstruct an actual travel route. Short intra-urban changes are retained in event details without enlarging their map distance.

The dated capital layer now includes Northern Wei Pingcheng/Luoyang, Eastern Wei Ye, Jin Zhongdu/Kaifeng and Later Jin Shenyang/Shengjing. Tang Zhongzong returns from Luoyang to Chang’an in 706, following the Old Book of Tang, rather than immediately with the restoration of Tang in 705. Sui Luoyang is labeled Tokyo in 605 and Eastern Capital from 606. Lin’an remains a provisional court seat. Temporary flight and imperial tours do not automatically replace the institutional capital.

Primary chronicles and museum, gazetteer and government evidence are attached to each entry. Month labels retain historical-calendar wording. `capitals.json.capitalChangeReview` records the scope and limits; this pass does not certify every dynasty’s monthly court location. An unrelated, unmistakable participant mismatch in the 1662 Yongli event was corrected from Zheng He to the Yongli emperor Zhu Youlang.

## Concurrent calendars

The map year shows all mapped polities with known annual era records, using polity colors. Selection does not hide other calendars. Same-year era changes share one row. Missing era records are omitted rather than inferred. The 1105 Liao and Western Xia calendars were checked against the Ministry of Education era table and the National Museum of China coin catalogue; Western Xia Zhenguan follows the latter's 1101–1113 dating.

## Event playback synchronization

The event rail follows the same integer calendar year as the map, without a separate easing clock. Each event date header anchors its year to the fixed center guide. Intervening years interpolate between dated anchors. Same-year events remain together; resizing content remeasures the anchors. Manual event scrolling still temporarily suspends follow mode.
