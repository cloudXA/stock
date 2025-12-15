// 五六七法则估值系统计算逻辑

// 等待DOM加载完成
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('valuation-form');
    const resultDiv = document.getElementById('result');
    
    // 监听表单提交事件
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // 获取输入值
        const roe = parseFloat(document.getElementById('roe').value);
        const dr = parseFloat(document.getElementById('dr').value);
        const pb = parseFloat(document.getElementById('pb').value);
        
        // 计算风险基数
        const riskBase = calculateRiskBase(dr);
        
        // 计算风险补充
        const riskSupplement = calculateRiskSupplement(dr);
        
        // 计算目标基数PB
        const targetPB = calculateTargetPB(roe, riskBase);
        
        // 计算买入点
        const buyPoint = calculateBuyPoint(targetPB, riskSupplement);
        
        // 计算卖出点
        const sellPoint = calculateSellPoint(buyPoint);
        
        // 展示结果
        displayResult(roe, dr, pb, riskBase, riskSupplement, targetPB, buyPoint, sellPoint);
    });
    
    // 计算风险基数
    function calculateRiskBase(dr) {
        if (dr < 50) return 5;
        if (dr <= 70) return 6;
        return 7;
    }
    
    // 计算风险补充
    function calculateRiskSupplement(dr) {
        if (dr < 50) return 0.7;
        if (dr <= 70) return 0.6;
        return 0.5;
    }
    
    // 计算目标基数PB
    function calculateTargetPB(roe, riskBase) {
        return roe / riskBase;
    }
    
    // 计算买入点
    function calculateBuyPoint(targetPB, riskSupplement) {
        return targetPB * riskSupplement;
    }
    
    // 计算卖出点
    function calculateSellPoint(buyPoint) {
        return buyPoint * 2;
    }
    
    // 展示计算结果
    function displayResult(roe, dr, pb, riskBase, riskSupplement, targetPB, buyPoint, sellPoint) {
        // 格式化数字，保留两位小数
        const format = (num) => num.toFixed(2);
        
        // 生成结果HTML
        const resultHTML = `
            <div class="result-item">
                <span class="result-label">输入ROE</span>
                <span class="result-value">${format(roe)}%</span>
            </div>
            <div class="result-item">
                <span class="result-label">输入负债率DR</span>
                <span class="result-value">${format(dr)}%</span>
            </div>
            <div class="result-item">
                <span class="result-label">输入市净率PB</span>
                <span class="result-value">${format(pb)}</span>
            </div>
            <div class="result-item">
                <span class="result-label">风险基数</span>
                <span class="result-value">${format(riskBase)}%</span>
            </div>
            <div class="result-item">
                <span class="result-label">风险补充</span>
                <span class="result-value">${format(riskSupplement)}</span>
            </div>
            <div class="result-item">
                <span class="result-label">目标基数PB</span>
                <span class="result-value">${format(targetPB)}</span>
            </div>
            <div class="result-item">
                <span class="result-label">买入点BUY</span>
                <span class="result-value ${pb < buyPoint ? 'success' : 'highlight'}">${format(buyPoint)}</span>
            </div>
            <div class="result-item">
                <span class="result-label">卖出点SAL</span>
                <span class="result-value ${pb > sellPoint ? 'highlight' : ''}">${format(sellPoint)}</span>
            </div>
            <div class="result-item">
                <span class="result-label">当前估值建议</span>
                <span class="result-value ${getRecommendationClass(pb, buyPoint, sellPoint)}">
                    ${getRecommendation(pb, buyPoint, sellPoint)}
                </span>
            </div>
        `;
        
        // 更新结果区域
        resultDiv.innerHTML = resultHTML;
    }
    
    // 获取建议类别
    function getRecommendationClass(pb, buyPoint, sellPoint) {
        if (pb < buyPoint) return 'success';
        if (pb > sellPoint) return 'highlight';
        return '';
    }
    
    // 获取估值建议
    function getRecommendation(pb, buyPoint, sellPoint) {
        if (pb < buyPoint) return '低估，建议买入';
        if (pb > sellPoint) return '高估，建议卖出';
        return '合理估值，观望';
    }
});