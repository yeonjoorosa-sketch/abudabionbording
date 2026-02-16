// ══════════════════════════════════
// Abu Dhabi Onboarding - Map Module
// ══════════════════════════════════

(function () {
    'use strict';

    // Location data per page (keyed by page filename)
    const locations = {
        'realestate.html': [
            { name: 'Aldar Properties', lat: 24.4539, lng: 54.3773, desc: { ko: '아부다비 최대 부동산 개발사', en: 'Abu Dhabi\'s largest developer', zh: '阿布扎比最大开发商' } },
            { name: 'Betterhomes', lat: 24.4335, lng: 54.6030, desc: { ko: '1986년 설립, 알 라하 비치', en: 'Est. 1986, Al Raha Beach', zh: '成立于1986年，阿尔拉哈海滩' } },
            { name: 'Crompton Partners', lat: 24.4870, lng: 54.3560, desc: { ko: '아부다비 최대 독립 중개사', en: 'Largest independent brokerage', zh: '最大独立经纪公司' } },
            { name: 'Metropolitan Capital', lat: 24.4537, lng: 54.3774, desc: { ko: '15개 이상 언어 상담', en: '15+ language consultants', zh: '15种以上语言咨询' } },
            { name: 'Hero Real Estate', lat: 24.4660, lng: 54.3920, desc: { ko: '럭셔리 부동산 전문', en: 'Luxury property specialist', zh: '豪华地产专家' } },
            { name: 'Savills Abu Dhabi', lat: 24.4870, lng: 54.3610, desc: { ko: '글로벌 부동산 서비스', en: 'Global property services', zh: '全球房产服务' } },
            { name: 'Driven Properties', lat: 24.4980, lng: 54.4060, desc: { ko: '데이터 기반 시장 분석', en: 'Data-driven market insights', zh: '数据驱动市场分析' } },
            { name: 'CBRE Abu Dhabi', lat: 24.4920, lng: 54.3830, desc: { ko: '세계적 상업용 부동산 리더', en: 'World-leading commercial RE', zh: '全球领先商业地产' } }
        ],
        'school.html': [
            { name: 'AISA', lat: 24.4700, lng: 54.3500, desc: { ko: '미국식 + IB, Abu Dhabi Island', en: 'American + IB, Abu Dhabi Island', zh: '美式+IB，阿布扎比岛' } },
            { name: 'Raha International School', lat: 24.4130, lng: 54.5860, desc: { ko: 'IB 풀코스, Khalifa City', en: 'Full IB, Khalifa City', zh: '全IB课程，哈利法城' } },
            { name: 'Brighton College', lat: 24.4540, lng: 54.3780, desc: { ko: '영국식 명문, Bloom Gardens', en: 'British Elite, Bloom Gardens', zh: '英式名校，Bloom花园' } },
            { name: 'Cranleigh Abu Dhabi', lat: 24.5350, lng: 54.4340, desc: { ko: '사디얏 아일랜드', en: 'Saadiyat Island', zh: '萨迪亚特岛' } },
            { name: 'GEMS American Academy', lat: 24.4070, lng: 54.5740, desc: { ko: '미국식 + IB, Khalifa City', en: 'American + IB, Khalifa City', zh: '美式+IB，哈利法城' } },
            { name: 'BISAD', lat: 24.3950, lng: 54.5680, desc: { ko: '영국식 + IB, Khalifa City B', en: 'British + IB, Khalifa City B', zh: '英式+IB，哈利法城B' } },
            { name: 'BSAK', lat: 24.4650, lng: 54.3710, desc: { ko: '1968년 설립, Al Mushrif', en: 'Est. 1968, Al Mushrif', zh: '1968年成立，Al Mushrif' } },
            { name: 'Bateen World Academy', lat: 24.4590, lng: 54.3470, desc: { ko: '영국식 + IB, Al Manaseer', en: 'British + IB, Al Manaseer', zh: '英式+IB，Al Manaseer' } }
        ],
        'babysitter.html': [
            { name: 'Sitters Child Care', lat: 24.4870, lng: 54.3565, desc: { ko: '정기/비정기 베이비시팅', en: 'Regular/on-demand babysitting', zh: '定期/临时婴儿看护' } },
            { name: 'Malaak Mama & Baby Care', lat: 24.4539, lng: 54.3773, desc: { ko: '산후 도우미 & 육아', en: 'Postnatal & childcare', zh: '产后护理和育儿' } },
            { name: 'Snappy Care', lat: 24.4630, lng: 54.3680, desc: { ko: '긴급/즉시 배정', en: 'Urgent/instant booking', zh: '紧急/即时预约' } },
            { name: 'High Profile Nannies', lat: 24.4710, lng: 54.3810, desc: { ko: '프리미엄 나니 서비스', en: 'Premium nanny service', zh: '高端保姆服务' } },
            { name: 'Peekaboo Nannies', lat: 24.4450, lng: 54.3950, desc: { ko: '이벤트 전문 베이비시터', en: 'Event babysitting specialist', zh: '活动保姆专家' } },
            { name: 'CloudNine Kids', lat: 24.4520, lng: 54.3600, desc: { ko: '홈케어/이벤트 돌봄', en: 'Home care & event sitting', zh: '居家/活动看护' } },
            { name: 'Handy Care Babysitting', lat: 24.4380, lng: 54.4100, desc: { ko: '공인 보육사 배정', en: 'Certified caregiver placement', zh: '认证护理人员' } }
        ],
        'maid.html': [
            { name: 'Housekeeping Co (Tadbeer)', lat: 24.4870, lng: 54.3565, desc: { ko: 'Tadbeer 공인 가사 도우미', en: 'Tadbeer-certified domestic help', zh: 'Tadbeer认证家政' } },
            { name: 'Maids.cc', lat: 24.4530, lng: 54.3770, desc: { ko: '온라인 가사 도우미 매칭', en: 'Online maid matching service', zh: '在线家政匹配' } },
            { name: 'Easy Maid Cleaning', lat: 24.4700, lng: 54.3660, desc: { ko: '청소 전문 서비스', en: 'Cleaning specialist', zh: '清洁专业服务' } },
            { name: 'Dmaids Cleaning', lat: 24.4450, lng: 54.3820, desc: { ko: '가정/사무실 청소', en: 'Home/office cleaning', zh: '家庭/办公室清洁' } },
            { name: 'Excellence Center (Tadbeer)', lat: 24.4320, lng: 54.4100, desc: { ko: 'Tadbeer 센터 가사 도우미', en: 'Tadbeer center domestic staff', zh: 'Tadbeer中心家政' } },
            { name: 'Irving Scott', lat: 24.4960, lng: 54.3810, desc: { ko: '프리미엄 가사 도우미', en: 'Premium domestic staff', zh: '高端家政人员' } },
            { name: 'HelperPlace', lat: 24.4610, lng: 54.3540, desc: { ko: '직접 고용 플랫폼', en: 'Direct hire platform', zh: '直接雇佣平台' } }
        ],
        'korean.html': [
            { name: 'NURI Grill & Bar', lat: 24.4954, lng: 54.6082, desc: { ko: 'Hilton Abu Dhabi Yas Island', en: 'Hilton Abu Dhabi Yas Island', zh: 'Hilton Abu Dhabi Yas Island' } },
            { name: 'Madang Korean Restaurant', lat: 24.4308, lng: 54.4445, desc: { ko: 'Holiday Inn / Al Ghazal Golf Club', en: 'Holiday Inn / Al Ghazal Golf Club', zh: 'Holiday Inn / Al Ghazal Golf Club' } },
            { name: 'Mukbang Shows Restaurant', lat: 24.4886, lng: 54.3665, desc: { ko: 'Sultan Bin Zayed St', en: 'Sultan Bin Zayed St', zh: 'Sultan Bin Zayed St' } },
            { name: 'Mr. Kim Korean BBQ', lat: 24.4887, lng: 54.6074, desc: { ko: 'Yas Mall, Yas Island', en: 'Yas Mall, Yas Island', zh: 'Yas Mall, Yas Island' } },
            { name: 'The Skewers Restaurant', lat: 24.4837, lng: 54.3729, desc: { ko: 'Hamdan Street', en: 'Hamdan Street', zh: 'Hamdan Street' } },
            { name: 'BonGa Restaurant (본가)', lat: 24.3653, lng: 54.5000, desc: { ko: 'Mussafah', en: 'Mussafah', zh: 'Mussafah' } },
            { name: 'Hankook Korean Restaurant', lat: 24.4740, lng: 54.3560, desc: { ko: 'Al Nahyan, Defence Road', en: 'Al Nahyan, Defence Road', zh: 'Al Nahyan, Defence Road' } }
        ],
        'grocery.html': [
            { name: 'Madang Mart (마당마트)', lat: 24.4840, lng: 54.3560, desc: { ko: '15 Al Hazam St, Al Hisn', en: '15 Al Hazam St, Al Hisn', zh: '15 Al Hazam St, Al Hisn' } },
            { name: 'Hanarum K-Mart (하나름마트)', lat: 24.3650, lng: 54.5050, desc: { ko: 'Mussafah ME-9', en: 'Mussafah ME-9', zh: 'Mussafah ME-9' } },
            { name: '1004 Gourmet', lat: 24.4960, lng: 54.4100, desc: { ko: 'Shams Boutik, Al Reem Island', en: 'Shams Boutik, Al Reem Island', zh: 'Shams Boutik, Al Reem Island' } },
            { name: 'QKO Asian Market', lat: 24.4837, lng: 54.3729, desc: { ko: 'Hamdan St / Dalma Mall / Yas Mall', en: 'Hamdan St / Dalma Mall / Yas Mall', zh: 'Hamdan St / Dalma Mall / Yas Mall' } },
            { name: 'Spinneys', lat: 24.4539, lng: 54.3773, desc: { ko: '아부다비 주요 지점', en: 'Multiple Abu Dhabi locations', zh: '阿布扎比多个分店' } }
        ],
        'tennis.html': [
            { name: 'Zayed Sports City Tennis', lat: 24.4530, lng: 54.3690, desc: { ko: '하드코트 8면, ATP/WTA 대회 개최지', en: '8 hard courts, ATP/WTA event venue', zh: '8个硬地球场，ATP/WTA赛事场地' } },
            { name: 'Abu Dhabi Country Club', lat: 24.4670, lng: 54.3750, desc: { ko: '플러드라이트 하드코트 4면', en: '4 floodlit hard courts', zh: '4个泛光灯硬地球场' } },
            { name: 'W Abu Dhabi Tennis (Yas)', lat: 24.4930, lng: 54.6100, desc: { ko: 'ITF 인증 코치, 야스 아일랜드', en: 'ITF-certified coaches, Yas Island', zh: 'ITF认证教练，亚斯岛' } },
            { name: 'Khalifa Park Tennis', lat: 24.4250, lng: 54.4600, desc: { ko: '공공 테니스 코트, 합리적 가격', en: 'Public courts, affordable rates', zh: '公共球场，价格合理' } },
            { name: 'Saadiyat Beach Golf Club Tennis', lat: 24.5440, lng: 54.4220, desc: { ko: '사디얏 아일랜드 프리미엄 클럽', en: 'Premium club, Saadiyat Island', zh: '萨迪亚特岛高端俱乐部' } },
            { name: 'Al Forsan Sports Resort', lat: 24.4100, lng: 54.5700, desc: { ko: '실내외 코트 보유, 칼리파 시티', en: 'Indoor & outdoor courts, Khalifa City', zh: '室内外球场，哈利法城' } }
        ],
        'golf.html': [
            { name: 'Yas Links Abu Dhabi', lat: 24.4890, lng: 54.6050, desc: { ko: '18홀 챔피언십 링크스, 야스 아일랜드', en: '18-hole championship links, Yas Island', zh: '18洞锦标赛林克斯球场，亚斯岛' } },
            { name: 'Abu Dhabi Golf Club', lat: 24.4440, lng: 54.4410, desc: { ko: '27홀, 매 모양 클럽하우스', en: '27 holes, falcon-shaped clubhouse', zh: '27洞，猎鹰造型会所' } },
            { name: 'Saadiyat Beach Golf Club', lat: 24.5440, lng: 54.4220, desc: { ko: '게리 플레이어 설계, 사디얏 아일랜드', en: 'Gary Player design, Saadiyat Island', zh: 'Gary Player设计，萨迪亚特岛' } },
            { name: 'Al Ghazal Golf Club', lat: 24.4310, lng: 54.4440, desc: { ko: '18홀 샌드 코스, 공항 인근', en: '18-hole sand course, near airport', zh: '18洞沙地球场，机场附近' } },
            { name: 'Topgolf Abu Dhabi', lat: 24.4960, lng: 54.6080, desc: { ko: '엔터테인먼트 골프, 야스 아일랜드', en: 'Entertainment golf, Yas Island', zh: '娱乐高尔夫，亚斯岛' } },
            { name: 'Abu Dhabi City Golf Club', lat: 24.4680, lng: 54.3730, desc: { ko: '9홀 파 36, 도심 위치', en: '9-hole par 36, city center', zh: '9洞标准杆36，市中心' } }
        ]
    };

    // Detect current page
    const pageName = window.location.pathname.split('/').pop() || 'index.html';
    const pageLocations = locations[pageName];

    if (!pageLocations) return; // No map for this page

    // Tab switching logic
    const listTab = document.querySelector('.view-tab[data-view="list"]');
    const mapTab = document.querySelector('.view-tab[data-view="map"]');
    const sectionEl = document.querySelector('.section');
    const mapView = document.querySelector('.map-view');

    if (!listTab || !mapTab || !sectionEl || !mapView) return;

    let mapInitialized = false;
    let map = null;

    function switchView(view) {
        if (view === 'list') {
            listTab.classList.add('active');
            mapTab.classList.remove('active');
            sectionEl.classList.add('active');
            mapView.classList.remove('active');
        } else {
            mapTab.classList.add('active');
            listTab.classList.remove('active');
            mapView.classList.add('active');
            sectionEl.classList.remove('active');
            if (!mapInitialized) {
                initMap();
                mapInitialized = true;
            } else {
                map.invalidateSize();
            }
        }
    }

    listTab.addEventListener('click', () => switchView('list'));
    mapTab.addEventListener('click', () => switchView('map'));

    // Default to list view
    sectionEl.classList.add('active');

    function initMap() {
        const lang = localStorage.getItem('abLang') || 'ko';

        map = L.map('mapContainer', {
            scrollWheelZoom: true,
            zoomControl: true
        });

        // OpenStreetMap tiles
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; OpenStreetMap contributors',
            maxZoom: 18
        }).addTo(map);

        // Custom gold marker icon
        const goldIcon = L.divIcon({
            className: 'custom-marker',
            html: '<svg width="28" height="38" viewBox="0 0 28 38" xmlns="http://www.w3.org/2000/svg"><path d="M14 0C6.27 0 0 6.27 0 14c0 10.5 14 24 14 24s14-13.5 14-24C28 6.27 21.73 0 14 0zm0 19c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z" fill="#b8962e"/><circle cx="14" cy="14" r="4" fill="#fff"/></svg>',
            iconSize: [28, 38],
            iconAnchor: [14, 38],
            popupAnchor: [0, -38]
        });

        const bounds = L.latLngBounds();

        pageLocations.forEach((loc, i) => {
            const marker = L.marker([loc.lat, loc.lng], { icon: goldIcon }).addTo(map);
            const desc = loc.desc[lang] || loc.desc.en;

            marker.bindPopup(
                '<div class="map-popup-title">' + loc.name + '</div>' +
                '<div class="map-popup-desc">' + desc + '</div>'
            );

            bounds.extend([loc.lat, loc.lng]);
        });

        map.fitBounds(bounds, { padding: [40, 40], maxZoom: 13 });
    }

    // Re-render popups on language change
    const origSetLang = window.setLang;
    if (origSetLang) {
        window.setLang = function (lang) {
            origSetLang(lang);
            if (map && mapInitialized) {
                map.eachLayer(layer => {
                    if (layer instanceof L.Marker) {
                        const latlng = layer.getLatLng();
                        const loc = pageLocations.find(l =>
                            Math.abs(l.lat - latlng.lat) < 0.001 && Math.abs(l.lng - latlng.lng) < 0.001
                        );
                        if (loc) {
                            const desc = loc.desc[lang] || loc.desc.en;
                            layer.setPopupContent(
                                '<div class="map-popup-title">' + loc.name + '</div>' +
                                '<div class="map-popup-desc">' + desc + '</div>'
                            );
                        }
                    }
                });
            }
        };
    }

})();
