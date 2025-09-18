const PARAMS = new URLSearchParams(location.search)

window.addEventListener('load', function () {
    document.getElementById('uid').value = PARAMS.get('uid')

    function setCharaList() {
        const UID = document.getElementById('uid').value

        document.getElementById('addedChara').remove();
        let group = document.createElement('div')
        group.id = 'addedChara'
        document.getElementById('charaSelect').appendChild(group)

        let box = document.getElementById('addedChara');


        let op1 = document.createElement('option');
        op1.textContent = 'UIDインポートは未完成です'
        op1.value = '1'


        console.log(UID)
        box.appendChild(op1);
    }
    document.getElementById('getUID').onclick = setCharaList;

    function calcEmBonus() {
        const EM = document.getElementById('status_em').value
        if (EM == "") {
            document.getElementById('status_em').value = 0
            return calcEmBonus()
        }
        if (EM.match(/^0./)) document.getElementById('status_em').value = EM.slice(1)
        if (!EM.match(/[0-9]+/)) return
        const emNum = Number(EM)
        const emBonus1 = Math.floor(2.78 * emNum / (emNum + 1400) * 100000) / 1000 //≒ 25*元素熟知 / (9*(元素熟知+1400))
        const emBonus2 = Math.floor(16 * emNum / (emNum + 2000) * 100000) / 1000
        const emBonus3 = Math.floor(5 * emNum / (emNum + 1200) * 100000) / 1000
        const emBonus4 = Math.floor(6 * emNum / (emNum + 2000) * 100000) / 1000
        document.getElementById("em-bonus-1").textContent = "+" + emBonus1 + "%"
        document.getElementById("em-bonus-2").textContent = "+" + emBonus2 + "%"
        document.getElementById("em-bonus-3").textContent = "+" + emBonus3 + "%"
        document.getElementById("em-bonus-4").textContent = "+" + emBonus4 + "%"
        calcReactionDMG()
        mathDamage()
    }
    document.getElementById('status_em').oninput = calcEmBonus;

    function calcAtkBuff() {
        const Base = document.getElementById('status_baseatk').value
        if (!Base.match(/[0-9]+/)) return document.getElementById('mathAtkOut').textContent = ""
        const cPer = document.getElementById('buff_atk_per').value
        const cInt = document.getElementById('buff_atk_int').value
        console.log(Base * cPer + cInt * 1)
        document.getElementById('mathAtkOut').textContent = (Base * cPer * 0.01 + cInt * 1)
    }
    function addAtkBuff() {
        const Base = document.getElementById('status_baseatk').value
        if (!Base.match(/[0-9]+/)) return document.getElementById('mathAtkOut').textContent = ""
        const cPer = document.getElementById('buff_atk_per').value
        const cInt = document.getElementById('buff_atk_int').value
        const oldAtk = document.getElementById('status_atk').value
        document.getElementById('mathAtkOut').textContent = (Base * cPer * 0.01 + cInt * 1)
        document.getElementById('status_atk').value = (Base * cPer * 0.01 + cInt * 1) + oldAtk * 1
    }
    document.getElementById('mathAtk').onclick = calcAtkBuff;
    document.getElementById('addAtk').onclick = addAtkBuff;

    function calcHpBuff() {
        const Base = document.getElementById('status_basehp').value
        if (!Base.match(/[0-9]+/)) return document.getElementById('mathHpOut').textContent = ""
        const cPer = document.getElementById('buff_hp_per').value
        const cInt = document.getElementById('buff_hp_int').value
        console.log(Base * cPer + cInt * 1)
        document.getElementById('mathHpOut').textContent = (Base * cPer * 0.01 + cInt * 1)
    }
    function addHpBuff() {
        const Base = document.getElementById('status_basehp').value
        if (!Base.match(/[0-9]+/)) return document.getElementById('mathHpOut').textContent = ""
        const cPer = document.getElementById('buff_hp_per').value
        const cInt = document.getElementById('buff_hp_int').value
        const oldHp = document.getElementById('status_hp').value
        document.getElementById('mathHpOut').textContent = (Base * cPer * 0.01 + cInt * 1)
        document.getElementById('status_hp').value = (Base * cPer * 0.01 + cInt * 1) + oldHp * 1
    }
    document.getElementById('mathHp').onclick = calcHpBuff;
    document.getElementById('addHp').onclick = addHpBuff;

    function calcDefBuff() {
        const Base = document.getElementById('status_basedef').value
        if (!Base.match(/[0-9]+/)) return document.getElementById('mathDefOut').textContent = ""
        const cPer = document.getElementById('buff_def_per').value
        const cInt = document.getElementById('buff_def_int').value
        console.log(Base * cPer + cInt * 1)
        document.getElementById('mathDefOut').textContent = (Base * cPer * 0.01 + cInt * 1)
    }
    function addDefBuff() {
        const Base = document.getElementById('status_basedef').value
        if (!Base.match(/[0-9]+/)) return document.getElementById('mathDefOut').textContent = ""
        const cPer = document.getElementById('buff_def_per').value
        const cInt = document.getElementById('buff_def_int').value
        const oldDef = document.getElementById('status_def').value
        document.getElementById('mathDefOut').textContent = (Base * cPer * 0.01 + cInt * 1)
        document.getElementById('status_def').value = (Base * cPer * 0.01 + cInt * 1) + oldDef * 1
    }
    document.getElementById('mathDef').onclick = calcDefBuff;
    document.getElementById('addDef').onclick = addDefBuff;

    function addCritRateBuff() {
        const Rate = document.getElementById('critRateBuff').value
        const oldRate = document.getElementById('status_critrate').value
        document.getElementById('status_critrate').value = Rate * 1 + oldRate * 1
        if (NaN !== (Rate * 1 + oldRate * 1)) document.getElementById('critRateBuff').value = ""
    }
    function addCritDmgBuff() {
        const Dmg = document.getElementById('critDmgBuff').value
        const oldDmg = document.getElementById('status_critdmg').value
        document.getElementById('status_critdmg').value = Dmg * 1 + oldDmg * 1
        if (NaN !== (Dmg * 1 + oldDmg * 1)) document.getElementById('critDmgBuff').value = ""
    }
    document.getElementById('addCritRate').onclick = addCritRateBuff;
    document.getElementById('addCritDmg').onclick = addCritDmgBuff;

    function calcCriticalDamageRate() {
        const rate = document.getElementById('status_critrate').value
        const dmg = document.getElementById('status_critdmg').value
        document.getElementById('critDamageRate').textContent = 1 + rate * 0.01 * dmg * 0.01
    }
    document.getElementById('crit').oninput = calcCriticalDamageRate


    document.getElementById('damagebuff-1').oninput = mathDamage;
    document.getElementById('damagebuff-2').oninput = mathDamage;
    document.getElementById('damagebuff-3').oninput = mathDamage;
    document.getElementById('damagebuff-4').oninput = mathDamage;
    document.getElementById('damagebuff-5').oninput = mathDamage;
    document.getElementById('damagebuff-6').oninput = mathDamage;
    document.getElementById('damagebuff-7').oninput = mathDamage;
    document.getElementById('damagebuff-8').oninput = mathDamage;
    document.getElementById('damagebuff-9').oninput = mathDamage;
    document.getElementById('damagebuff-10').oninput = mathDamage;
    document.getElementById('damagebuff-11').oninput = mathDamage;
    document.getElementById('damagebuff-12').oninput = mathDamage;
    document.getElementById('damagebuff-13').oninput = mathDamage;
    document.getElementById('damagebuff-14').oninput = mathDamage;


    function calcResistance() {
        const Base = Number(document.getElementById('res-base').value) * 0.01
        const up = Number(document.getElementById('res-up').value) * 0.01
        const down = Number(document.getElementById('res-down').value) * 0.01
        const nowRes = Base + up - down
        let out
        if (nowRes < 0) {
            out = 1 - nowRes / 2
        } else if (nowRes >= 75) {
            out = 1 / (4 * nowRes + 1)
        } else {
            out = 1 - nowRes
        }
        document.getElementById('res-out').textContent = out
        calcReactionDMG()
        mathDamage()
    }
    document.getElementById('res-base').oninput = calcResistance;
    document.getElementById('res-up').oninput = calcResistance;
    document.getElementById('res-down').oninput = calcResistance;
    calcResistance();

    function calcTargetDefence() {
        const targetLevel = Number(document.getElementById('target-level').value)
        const ignore = Number(document.getElementById('target-def-ignore').value) * 0.01
        let down = Number(document.getElementById('target-def-down').value) * 0.01
        if (down >= 1) down = 1
        const LEVEL = Number(document.getElementById('level').value)
        var target_def = (LEVEL + 100) / ((1 - ignore) * (1 - down) * (targetLevel + 100) + LEVEL + 100)
        document.getElementById('target-def-out').textContent = target_def
        mathDamage()
    }
    document.getElementById('target-level').oninput = calcTargetDefence;
    document.getElementById('target-def-ignore').oninput = calcTargetDefence;
    document.getElementById('target-def-down').oninput = calcTargetDefence;
    calcTargetDefence();

    function setNiloBox() {
        const f = document.getElementById('nilo')
        if (document.getElementById('if_nilo').checked) {
            let hpbox = document.createElement('input')
            hpbox.type = 'text'
            hpbox.id = 'nilo_hp'
            hpbox.placeholder = 'ニィロウのHP'
            f.appendChild(hpbox)
            document.getElementById('nilo_hp').oninput = calcReactionDMG;
        } else {
            document.getElementById('nilo_hp').remove();
            calcReactionDMG()
        }
    }
    document.getElementById('if_nilo').oninput = setNiloBox;

    function calcReactionDMG() {
        const REACTION_BY_LV = [0, 17.165605, 18.535048, 19.904854, 21.274903, 22.6454, 24.649613, 26.640643, 28.868587, 31.367679, 34.143343, 37.201, 40.66, 44.446668, 48.563519, 53.74848, 59.081897, 64.420047, 69.724455, 75.123137, 80.584775, 86.112028, 91.703742, 97.244628, 102.812644, 108.409563, 113.201694, 118.102906, 122.979318, 129.72733, 136.29291, 142.67085, 149.029029, 155.416987, 161.825495, 169.106313, 176.518077, 184.072741, 191.709518, 199.556908, 207.382042, 215.3989, 224.165667, 233.50216, 243.350573, 256.063067, 268.543493, 281.526075, 295.013648, 309.067188, 323.601597, 336.757542, 350.530312, 364.482705, 378.619181, 398.600417, 416.398254, 434.386996, 452.951051, 472.606217, 492.88489, 513.568543, 539.103198, 565.510563, 592.538753, 624.443427, 651.470148, 679.49683, 707.79406, 736.671422, 765.640231, 794.773403, 824.677397, 851.157781, 877.74209, 914.229123, 946.746752, 979.411386, 1011.223022, 1044.791746, 1077.443668, 1109.99754, 1142.976615, 1176.369483, 1210.184393, 1253.835659, 1288.952801, 1325.484092, 1363.456928, 1405.097377, 1446.853458, 1488.215547, 1528.444567, 1580.367911, 1630.847528, 1711.197785, 1780.453941, 1847.322809, 1911.474309, 1972.864342, 2030.071808]
        const LEVEL = document.getElementById('level').value
        const EM_BONUS = Number(document.getElementById('em-bonus-2').textContent.slice(1, -2)) * 0.01
        const Resistance = Number(document.getElementById('res-out').textContent)
        let nilo_bonus
        if (document.getElementById('if_nilo').checked) {
            nilo_bonus = (Number(document.getElementById('nilo_hp').value) - 29999) * 0.00009
            if (nilo_bonus < 0) nilo_bonus = 0
            if (nilo_bonus > 4) nilo_bonus = 4
            console.log(nilo_bonus)
        } else {
            nilo_bonus = 0
        }
        const REACT_BONUS_1 = Number(document.getElementById('react-bonus-1').value)
        const REACT_BONUS_2 = Number(document.getElementById('react-bonus-2').value)
        const REACT_BONUS_3 = Number(document.getElementById('react-bonus-3').value)
        const REACT_BONUS_4 = Number(document.getElementById('react-bonus-4').value)
        const REACT_BONUS_5 = Number(document.getElementById('react-bonus-5').value)
        const REACT_BONUS_6 = Number(document.getElementById('react-bonus-6').value)
        const REACT_BONUS_7 = Number(document.getElementById('react-bonus-7').value)
        const REACT_BONUS_8 = Number(document.getElementById('react-bonus-8').value)
        document.getElementById('react1').textContent = Math.floor(REACTION_BY_LV[LEVEL] * 0.25 * (1 + EM_BONUS + REACT_BONUS_1) * Resistance)
        document.getElementById('react2').textContent = Math.floor(REACTION_BY_LV[LEVEL] * 1.5 * (1 + EM_BONUS + REACT_BONUS_2) * Resistance)
        document.getElementById('react3').textContent = Math.floor(REACTION_BY_LV[LEVEL] * 0.6 * (1 + EM_BONUS + REACT_BONUS_3) * Resistance)
        document.getElementById('react4').textContent = Math.floor(REACTION_BY_LV[LEVEL] * 2 * (1 + EM_BONUS + REACT_BONUS_4) * Resistance)
        document.getElementById('react5').textContent = Math.floor(REACTION_BY_LV[LEVEL] * 3 * (1 + EM_BONUS + REACT_BONUS_5) * Resistance)
        document.getElementById('react6').textContent = Math.floor(REACTION_BY_LV[LEVEL] * 2.75 * (1 + EM_BONUS + REACT_BONUS_6) * Resistance)
        document.getElementById('react7').textContent = Math.floor(REACTION_BY_LV[LEVEL] * 2 * (1 + EM_BONUS + REACT_BONUS_7 + nilo_bonus) * Resistance)
        document.getElementById('react8').textContent = Math.floor(REACTION_BY_LV[LEVEL] * 3 * (1 + EM_BONUS + REACT_BONUS_8) * Resistance)
    }

    function BoxViewToggle(react, view) {
        var box = document.getElementById('box_' + react)
        document.getElementById(react).checked = false
        if (view == 'show') {
            box.style.display = 'block'
        } else if (view == 'hide') {
            box.style.display = 'none'
        }
    }
        function InputViewToggle(react, view) {
        var box = document.getElementById('input_' + react)
        if (view == 'show') {
            box.style.display = 'block'
        } else if (view == 'hide') {
            box.style.display = 'none'
        }
    }

    const lightenColor = (rgb, percentage) => {
        let [r, g, b] = rgb.match(/\d+/g).map(x => x * percentage);
        return `rgb(${r}, ${g}, ${b})`;
    }
    const lunarReactColor = (ElementName, mode, tag) => {
        let element = document.getElementById(ElementName)
        if (mode == true) {
            if (!element.classList.contains(tag)) element.classList.add(tag)
        } else if (mode == false) {
            if (element.classList.contains(tag)) element.classList.remove(tag)
        }
    }
    function lrc(mode, tag) {
        lunarReactColor('damage-print-crit-r', mode, tag)
        lunarReactColor('damage-print-r', mode, tag)
        lunarReactColor('damage-print-nocrit-r', mode, tag)
    }
    function lrColor() {
        const lunar_reaction = [document.getElementById('lunar_charged').checked, document.getElementById('lunar_bloom').checked] //月反応
        if (lunar_reaction[0]) {
            lrc(true, 'lunar-charged')
            lrc(false, 'lunar-bloom')
        } else if (lunar_reaction[1]) {
            lrc(false, 'lunar-charged')
            lrc(true, 'lunar-bloom')
        } else {
            lrc(false, 'lunar-charged')
            lrc(false, 'lunar-bloom')
        }
    }
    function ReactBox() {
        const element = document.getElementById('element-type').value
        var text_color = document.getElementById('output-damage')
        if (element == '1') {
            text_color.style.color = '#FFFFFF'
            InputViewToggle('bonus_pyro', 'hide')
            InputViewToggle('bonus_catalyze', 'hide')
            InputViewToggle('bonus_lunar', 'hide')
            BoxViewToggle('vaporize', 'hide')
            BoxViewToggle('melt', 'hide')
            BoxViewToggle('aggravate', 'hide')
            BoxViewToggle('lunar_charged', 'hide')
            BoxViewToggle('spread', 'hide')
            BoxViewToggle('lunar_bloom', 'hide')
        } else if (element == '2') {
            text_color.style.color = '#FF9B00'
            InputViewToggle('bonus_catalyze', 'hide')
            InputViewToggle('bonus_lunar', 'hide')
            BoxViewToggle('vaporize', 'show')
            BoxViewToggle('melt', 'show')
            BoxViewToggle('aggravate', 'hide')
            BoxViewToggle('lunar_charged', 'hide')
            BoxViewToggle('spread', 'hide')
            BoxViewToggle('lunar_bloom', 'hide')
        } else if (element == '3') {
            text_color.style.color = '#33CCFF'
            InputViewToggle('bonus_catalyze', 'hide')
            InputViewToggle('bonus_lunar', 'hide')
            BoxViewToggle('vaporize', 'show')
            BoxViewToggle('melt', 'hide')
            BoxViewToggle('aggravate', 'hide')
            BoxViewToggle('lunar_charged', 'hide')
            BoxViewToggle('spread', 'hide')
            BoxViewToggle('lunar_bloom', 'hide')
        } else if (element == '4') {
            text_color.style.color = '#99FFFF'
            InputViewToggle('bonus_catalyze', 'hide')
            InputViewToggle('bonus_lunar', 'hide')
            BoxViewToggle('vaporize', 'hide')
            BoxViewToggle('melt', 'show')
            BoxViewToggle('aggravate', 'hide')
            BoxViewToggle('lunar_charged', 'hide')
            BoxViewToggle('spread', 'hide')
            BoxViewToggle('lunar_bloom', 'hide')
        } else if (element == '5') {
            text_color.style.color = '#E19BFF'
            InputViewToggle('bonus_pyro', 'hide')
            BoxViewToggle('vaporize', 'hide')
            BoxViewToggle('melt', 'hide')
            BoxViewToggle('aggravate', 'show')
            BoxViewToggle('lunar_charged', 'show')
            BoxViewToggle('spread', 'hide')
            BoxViewToggle('lunar_bloom', 'hide')
        } else if (element == '6') {
            text_color.style.color = '#66FFCC'
            InputViewToggle('bonus_pyro', 'hide')
            InputViewToggle('bonus_catalyze', 'hide')
            InputViewToggle('bonus_lunar', 'hide')
            BoxViewToggle('vaporize', 'hide')
            BoxViewToggle('melt', 'hide')
            BoxViewToggle('aggravate', 'hide')
            BoxViewToggle('lunar_charged', 'hide')
            BoxViewToggle('spread', 'hide')
            BoxViewToggle('lunar_bloom', 'hide')
        } else if (element == '7') {
            text_color.style.color = '#FFCC66'
            InputViewToggle('bonus_pyro', 'hide')
            InputViewToggle('bonus_catalyze', 'hide')
            InputViewToggle('bonus_lunar', 'hide')
            BoxViewToggle('vaporize', 'hide')
            BoxViewToggle('melt', 'hide')
            BoxViewToggle('aggravate', 'hide')
            BoxViewToggle('lunar_charged', 'hide')
            BoxViewToggle('spread', 'hide')
            BoxViewToggle('lunar_bloom', 'hide')
        } else if (element == '8') {
            text_color.style.color = '#00EA52'
            InputViewToggle('bonus_catalyze', 'hide')
            InputViewToggle('bonus_lunar', 'hide')
            BoxViewToggle('vaporize', 'hide')
            BoxViewToggle('melt', 'hide')
            BoxViewToggle('aggravate', 'hide')
            BoxViewToggle('lunar_charged', 'hide')
            BoxViewToggle('spread', 'show')
            BoxViewToggle('lunar_bloom', 'show')
        } else {
            InputViewToggle('bonus_pyro', 'hide')
            InputViewToggle('bonus_catalyze', 'hide')
            InputViewToggle('bonus_lunar', 'hide')
            BoxViewToggle('vaporize', 'hide')
            BoxViewToggle('melt', 'hide')
            BoxViewToggle('aggravate', 'hide')
            BoxViewToggle('lunar_charged', 'hide')
            BoxViewToggle('spread', 'hide')
            BoxViewToggle('lunar_bloom', 'hide')
        }
        text_color.style.webkitTextStrokeColor = lightenColor(document.getElementById('output-damage').style.color, 0.6)
        text_color.style.webkitTextStrokeWidth = '0.2px'
        lrColor();
        mathDamage();
    }
    document.getElementById('element-type').onchange = ReactBox;
    function PyroReactBox() {//炎元素選択時の複数元素反応選択対策
        var vaporize = document.getElementById('vaporize')
        var melt = document.getElementById('melt')
        const element = document.getElementById('element-type').value
        if (element !== '2') return mathDamage()
        if (vaporize.checked) {
            melt.disable = true
            melt.checked = false
            InputViewToggle('bonus_pyro', 'show')
        } else if (melt.checked) {
            vaporize.disable = true
            vaporize.checked = false
            InputViewToggle('bonus_pyro', 'show')
        }else{
            InputViewToggle('bonus_pyro', 'hide')
        }
        mathDamage()
    }
    document.getElementById('box_vaporize').oninput = PyroReactBox;
    document.getElementById('box_melt').oninput = PyroReactBox;
    function ElectroReactBox() {//雷元素選択時の複数元素反応選択対策
        var aggravate = document.getElementById('aggravate')
        var lunar_charged = document.getElementById('lunar_charged')
        const element = document.getElementById('element-type').value
        if (element !== '5') return mathDamage()
        if (aggravate.checked) {
            lunar_charged.disable = true
            lunar_charged.checked = false
            InputViewToggle('bonus_catalyze', 'show')
            InputViewToggle('bonus_lunar', 'hide')
        } else if (lunar_charged.checked) {
            aggravate.disable = true
            aggravate.checked = false
            InputViewToggle('bonus_catalyze', 'hide')
            InputViewToggle('bonus_lunar', 'show')
        }else{
            InputViewToggle('bonus_catalyze', 'hide')
            InputViewToggle('bonus_lunar', 'hide')
        }
        lrColor();
        mathDamage();
    }
    document.getElementById('box_aggravate').oninput = ElectroReactBox;
    document.getElementById('box_lunar_charged').oninput = ElectroReactBox;
    function DendroReactBox() {//草元素選択時の複数元素反応選択対策
        var spread = document.getElementById('spread')
        var lunar_bloom = document.getElementById('lunar_bloom')
        const element = document.getElementById('element-type').value
        if (element !== '8') return mathDamage()
        if (spread.checked) {
            lunar_bloom.disable = true
            lunar_bloom.checked = false
            InputViewToggle('bonus_catalyze', 'show')
            InputViewToggle('bonus_lunar', 'hide')
        } else if (lunar_bloom.checked) {
            spread.disable = true
            spread.checked = false
            InputViewToggle('bonus_catalyze', 'hide')
            InputViewToggle('bonus_lunar', 'show')
        }else{
            InputViewToggle('bonus_catalyze', 'hide')
            InputViewToggle('bonus_lunar', 'hide')
        }
        lrColor();
        mathDamage();
    }
    document.getElementById('box_spread').oninput = DendroReactBox;
    document.getElementById('box_lunar_bloom').oninput = DendroReactBox;

    function lunarNodcharaBuffCheck(){
        if(document.getElementById('if_nodchara').checked){
            document.getElementById('box_nodchara_basebuff').style.display = 'block'
        }else {
            document.getElementById('box_nodchara_basebuff').style.display = 'none'
            document.getElementById('nodchara_basebuff').value = ''
        }
        mathDamage;
    }
    document.getElementById('if_nodchara').oninput = lunarNodcharaBuffCheck;
    document.getElementById('nodchara_basebuff').oninput = mathDamage;

    function atkRateBase() {
        const type = document.getElementById('atkRate-Base')
        var Box = document.getElementById('emRateView')
        if (type.value == 5) {
            Box.style.display = 'block'
        } else if (type.value !== 5 && Box.style.display == 'block') {
            Box.style.display = 'none'
        }
        const atkRateList = ['', '攻撃力', '体力', '防御力', '元素熟知', '攻撃力']
        document.getElementById('atkRateViewBase').textContent = atkRateList[type.value]
        mathDamage();
    }
    document.getElementById('atkRate-Base').onchange = atkRateBase;
    document.getElementById('atkRate-Multiple').onchange = mathDamage;

    function mathDamage() {
        //先に必要な情報を入れる
        const REACTION_BY_LV = [0, 17.165605, 18.535048, 19.904854, 21.274903, 22.6454, 24.649613, 26.640643, 28.868587, 31.367679, 34.143343, 37.201, 40.66, 44.446668, 48.563519, 53.74848, 59.081897, 64.420047, 69.724455, 75.123137, 80.584775, 86.112028, 91.703742, 97.244628, 102.812644, 108.409563, 113.201694, 118.102906, 122.979318, 129.72733, 136.29291, 142.67085, 149.029029, 155.416987, 161.825495, 169.106313, 176.518077, 184.072741, 191.709518, 199.556908, 207.382042, 215.3989, 224.165667, 233.50216, 243.350573, 256.063067, 268.543493, 281.526075, 295.013648, 309.067188, 323.601597, 336.757542, 350.530312, 364.482705, 378.619181, 398.600417, 416.398254, 434.386996, 452.951051, 472.606217, 492.88489, 513.568543, 539.103198, 565.510563, 592.538753, 624.443427, 651.470148, 679.49683, 707.79406, 736.671422, 765.640231, 794.773403, 824.677397, 851.157781, 877.74209, 914.229123, 946.746752, 979.411386, 1011.223022, 1044.791746, 1077.443668, 1109.99754, 1142.976615, 1176.369483, 1210.184393, 1253.835659, 1288.952801, 1325.484092, 1363.456928, 1405.097377, 1446.853458, 1488.215547, 1528.444567, 1580.367911, 1630.847528, 1711.197785, 1780.453941, 1847.322809, 1911.474309, 1972.864342, 2030.071808]
        const LEVEL = document.getElementById('level').value
        const atkRateBase = document.getElementById('atkRate-Base').value //参照先
        const attack_type = Number(document.getElementById('attack-type').value) //攻撃タイプ
        const element = document.getElementById('element-type').value //元素タイプ
        const lunar_reaction = [document.getElementById('lunar_charged').checked, document.getElementById('lunar_bloom').checked] //月反応
        const pyro_reaction = [document.getElementById('vaporize').checked, document.getElementById('melt').checked] // 蒸発・溶解
        const catalyze = [document.getElementById('aggravate').checked, document.getElementById('spread').checked] // 超・草激化
        const DamageBuffList = [ //ダメバフ情報のすべてを配列化
            0.01 * Number(document.getElementById('damagebuff-14').value),
            0.01 * Number(document.getElementById('damagebuff-1').value),
            0.01 * Number(document.getElementById('damagebuff-2').value),
            0.01 * Number(document.getElementById('damagebuff-3').value),
            0.01 * Number(document.getElementById('damagebuff-4').value),
            0.01 * Number(document.getElementById('damagebuff-5').value),
            0.01 * Number(document.getElementById('damagebuff-6').value),
            0.01 * Number(document.getElementById('damagebuff-7').value),
            0.01 * Number(document.getElementById('damagebuff-8').value),
            0.01 * Number(document.getElementById('damagebuff-9').value),
            0.01 * Number(document.getElementById('damagebuff-10').value),
            0.01 * Number(document.getElementById('damagebuff-11').value),
            0.01 * Number(document.getElementById('damagebuff-12').value),
            0.01 * Number(document.getElementById('damagebuff-13').value),
        ]

        //基礎ダメージ算出
        let BaseDamage = Number(document.getElementById('atkRate').value) * 0.01 //倍率
        BaseDamage *= Number(document.getElementById('atkRate-Multiple').value) * 0.01 //特殊乗算
        if (atkRateBase == 1) { //参照したステータスを倍率とかける
            BaseDamage *= Number(document.getElementById('status_atk').value)
        } else if (atkRateBase == 2) {
            BaseDamage *= Number(document.getElementById('status_hp').value)
        } else if (atkRateBase == 3) {
            BaseDamage *= Number(document.getElementById('status_def').value)
        } else if (atkRateBase == 4) {
            BaseDamage *= Number(document.getElementById('status_em').value)
        } else if (atkRateBase == 5) {
            BaseDamage *= Number(document.getElementById('status_atk').value)
            var emDamage = Number(document.getElementById('emRate').value) * 0.01 //攻撃倍率+熟知倍率
            emDamage *= Number(document.getElementById('status_em').value)
            BaseDamage += emDamage
        }
        let addCatalyze = 0
        if (catalyze[0] == true) {//元素反応処理(激化)
            addCatalyze = (1.15 * REACTION_BY_LV[LEVEL] * (1 + Number(document.getElementById('em-bonus-3').textContent.slice(1, -2)) * 0.01 + Number(document.getElementById('react-bonus-10').value) * 0.01))
        } else if (catalyze[1] == true) {//元素反応処理(激化)
            addCatalyze = (1.25 * REACTION_BY_LV[LEVEL] * (1 + Number(document.getElementById('em-bonus-3').textContent.slice(1, -2)) * 0.01 + Number(document.getElementById('react-bonus-10').value) * 0.01))
        }
        BaseDamage += Number(document.getElementById('AddBaseDmg').value) + addCatalyze //基礎ダメ加算
        let Damage = BaseDamage//基礎ダメージ結果をわかりやすく名前を変える

        //ダメージバフ処理
        let DamageBuff = 1 + DamageBuffList[0] + DamageBuffList[element] + DamageBuffList[attack_type + 8]
        if(!(lunar_reaction[0] || lunar_reaction[1])) Damage *= DamageBuff
        //元素反応処理(蒸発・溶解・月反応)
        if (element == '2') { //蒸発・溶解反応
            if (pyro_reaction[0]) {
                Damage *= 1.5 * (1 + Number(document.getElementById('em-bonus-1').textContent.slice(1, -2)) * 0.01 + Number(document.getElementById('react-bonus-9').value) * 0.01)
            } else if (pyro_reaction[1]) {
                Damage *= 2 * (1 + Number(document.getElementById('em-bonus-1').textContent.slice(1, -2)) * 0.01 + Number(document.getElementById('react-bonus-9').value) * 0.01)
            }
        } else if (element == '3') {
            console.log(pyro_reaction)
            if (pyro_reaction[0]) {
                Damage *= 2 * (1 + Number(document.getElementById('em-bonus-1').textContent.slice(1, -2)) * 0.01 + Number(document.getElementById('react-bonus-9').value) * 0.01)
            }
        } else if (element == '4') {
            if (pyro_reaction[1]) {
                Damage *= 1.5 * (1 + Number(document.getElementById('em-bonus-1').textContent.slice(1, -2)) * 0.01 + Number(document.getElementById('react-bonus-9').value) * 0.01)
            }
        }
        let basebuff = 1 + Number(document.getElementById('nodchara_basebuff').value) * 0.01
        if(lunar_reaction[0]){ //月反応
            Damage *= basebuff
            Damage *= 3 * (1 + Number(document.getElementById('em-bonus-4').textContent.slice(1, -2)) * 0.01 + Number(document.getElementById('react-bonus-11').value) * 0.01)
        }else if(lunar_reaction[1]){
            Damage *= basebuff
            Damage *= 1 * (1 + Number(document.getElementById('em-bonus-4').textContent.slice(1, -2)) * 0.01 + Number(document.getElementById('react-bonus-11').value) * 0.01)
        }

        //敵耐性処理
        Damage *= Number(document.getElementById('res-out').textContent)
        //敵防御処理
        if(!(lunar_reaction[0] || lunar_reaction[1])) Damage *= Number(document.getElementById('target-def-out').textContent)

        //会心処理
        let Damage_Crit = Damage * (1 + Number(document.getElementById('status_critdmg').value) * 0.01)
        let Damage_Expect = Damage * Number(document.getElementById('critDamageRate').textContent)
        //表示
        document.getElementById('damage-print-crit').textContent = Math.floor(Damage_Crit * 1000) / 1000;
        document.getElementById('damage-print').textContent = Math.floor(Damage_Expect * 1000) / 1000;
        document.getElementById('damage-print-nocrit').textContent = Math.floor(Damage * 1000) / 1000;
    }
    document.getElementById('status_atk').oninput = mathDamage;
    document.getElementById('status_hp').oninput = mathDamage;
    document.getElementById('status_def').oninput = mathDamage;
    document.getElementById('status_critrate').oninput = mathDamage;
    document.getElementById('status_critdmg').oninput = mathDamage;
    document.getElementById('atkRate').oninput = mathDamage;
    document.getElementById('emRate').oninput = mathDamage;
    document.getElementById('AddBaseDmg').oninput = mathDamage;
    document.getElementById('element-type').oninput = mathDamage;
    document.getElementById('attack-type').oninput = mathDamage;
    document.getElementById('react-bonus-9').oninput = mathDamage;
    document.getElementById('react-bonus-10').oninput = mathDamage;
    document.getElementById('react-bonus-11').oninput = mathDamage;
});
