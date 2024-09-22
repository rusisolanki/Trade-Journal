export const headings = {
    equityTrade: ['ID', 'Date', 'Symbol', 'Entry Quantity', 'Entry Price', 'Stoploss(SL)', 'SL%', 'Position Size(PS)', 'PS%', 'Risk Per Trade(RPT)', 'RPT%', 'Exit%', 'Exit Price', 'Gain%', 'Capital Deployed', 'RoCD', 'Starting Account Value', 'ROSV', 'Account Value', 'Account Gain%', 'Days', 'RR', 'Net Profit'],
    futureTrade: ['ID', 'Date', 'Symbol', 'Entry Quantity', 'Expiry Date', 'Lot Size', 'Entry Price', 'Stoploss(SL)', 'SL%', 'Position Size(PS)', 'PS%', 'Risk Per Trade(RPT)', 'RPT%', 'Exit%', 'Exit Price', 'Gain%', 'Capital Deployed', 'RoCD', 'Starting Account Value', 'ROSV', 'Account Value', 'Account Gain%', 'Days', 'RR', 'Net Profit'],
    equityPositions: ['ID', 'Date', 'Symbol', 'Type', 'Open Qty', 'Open %', 'Entry Price', 'SL', 'SL %', 'Current SL', 'Exposure', 'Exposure %', 'Open Risk', 'Open Risk %', 'Net Profit'],
    futurePositions: ['ID', 'Date', 'Symbol', 'Type', 'Open Qty', 'Expiry Date', 'Lot Size', 'Open %', 'Entry Price', 'SL', 'SL %', 'Current SL', 'Exposure', 'Exposure %', 'Open Risk', 'Open Risk %', 'Net Profit'],
    symbols: ['ID', 'SYMBOL', 'NAME', 'SECTOR', 'INDUSTRY'],
    capital: ['Date', 'Type', 'Amount'],
    adjustments: ['Date', 'Type', 'Amount'],
    entry: ['Entry Date', 'Entry Price', 'Quantity', 'SL', 'SL%', 'Position Size', 'RPT', 'Charges'],
    exit: ['Exit Date', 'Exit Price', 'Exit%', 'Days', 'Exit Quantity', 'Charges', 'Profit', 'R Multiple'],
    summary: ['Period', 'Open Trades', 'New Trades', 'Fully Closed', 'Partially Closed', 'Win Rate %', 'Avg. RPT', 'Avg. RPT%', 'Avg Loss', 'Avg Loss %', 'Avg Gain', 'Avg Gain %', 'ARR', 'Avg. Days', 'Profit', 'Charges', 'Net Profit', 'Account Value', 'Captial Deployed', 'RoCD', 'RoSAV']
}