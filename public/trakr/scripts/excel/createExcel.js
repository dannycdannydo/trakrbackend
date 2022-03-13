const ExcelJS = require('exceljs')
const { assetSums } = require('../../../../public/trakr/scripts/sums/assetSums')
const fs = require('fs')
const { getImage } = require('../storage/getImage')
const libre = require('libreoffice-convert');
libre.convertAsync = require('util').promisify(libre.convert);
const workBookProperties = {
    creator: 'Trakr Limited',
    lastModifiedBy: 'Trakr Limited',
    created: new Date(),
}
const workSheetProperties = {
    properties: {
        tabColor: { argb: '214b62' },
    },
}
const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'

const columnProperties = {
    MyList: [
        { header: 'Image', key: 'image', width: 15, vertAlign: 'middle', horizAlign: 'center' },
        { header: 'Address', key: 'address', width: 30, alignment: { vertical: 'middle', horizontal: 'left' } },
        { header: 'Latitude, Longitude', key: 'latlng', width: 25, alignment: { vertical: 'middle', horizontal: 'center' } },
        { header: 'Date', key: 'date', width: 15, alignment: { vertical: 'middle', horizontal: 'center' } },
        { header: 'Sectors', key: 'sectors', width: 30, alignment: { vertical: 'middle', horizontal: 'left' } },
        { header: 'Sub-Sectors', key: 'subsectors', width: 30, alignment: { vertical: 'middle', horizontal: 'left' } },
        { header: 'Rent', key: 'rent', width: 15, style: { numFmt: '"£"#,##0;[Red]-"£"#,##0' }, alignment: { vertical: 'middle', horizontal: 'center' } },
        { header: 'Price', key: 'price', width: 18, style: { numFmt: '"£"#,##0;[Red]-"£"#,##0' }, alignment: { vertical: 'middle', horizontal: 'center' } },
        { header: 'Yield', key: 'yield', width: 15, style: { numFmt: '0.00%;' }, alignment: { vertical: 'middle', horizontal: 'center' } },
        { header: 'Brochure', key: 'brochure', width: 15, alignment: { vertical: 'middle', horizontal: 'center' } },
        { header: 'Map Link', key: 'maplink', width: 15, alignment: { vertical: 'middle', horizontal: 'center' } },
    ],
}

const topStylingProperties = {
    MyList: {
        title: 'Trakr - Investment Transaction Schedule',
    },
}

const excelImage = {
    MyList: {
        path: 'public/images/TrakrHorizontal.png',
        extension: 'png',
    },
}

const stylingProperties = {
    MyList: {
        header: {
            font: {
                color: { argb: 'ffffff' },
                family: 2,
                size: 13,
                bold: true,
            },
            fill: {
                type: 'pattern',
                pattern: 'solid',
                fgColor: { argb: '214b62' },
            },
        },
        evenRow: {
            fill: {
                type: 'pattern',
                pattern: 'solid',
                fgColor: { argb: 'ededed' },
            },
        },
        links: [
                {
                    key: 'brochure',
                    text: 'Brochure',
                    font: {
                        color: { argb: '214b62' },
                        underline: true,
                    },
                },
                {
                    key: 'maplink',
                    text: 'Map',
                    font: {
                        color: { argb: '214b62' },
                        underline: true,
                    },
                },
        ],
    },
}

async function createExcel (data, template, sheetName, pdf) {
    const workbook = new ExcelJS.Workbook()
    workbook.calcProperties.fullCalcOnLoad = true
    for (const [key, value] of Object.entries(workBookProperties)) {
        workbook[key] = value
    }
    workbook.addWorksheet(sheetName, workSheetProperties)
    let worksheet = workbook.getWorksheet(sheetName)
    worksheet.columns = columnProperties[template]
    for (var d in data) {
        const row = getRow(data[d], template)
        worksheet.addRow(row)
        let image = null
        try {
            image = await getImage(data[d].base.filename)
        } catch {
            image = await getImage('TrakrVertical')
        }
        const imageId = workbook.addImage({
            buffer: image,
            extension: 'jpg',
          });
        worksheet.addImage(imageId, `A${(d*1)+5}:A${(d*1)+5}`)
    }
    worksheet.addRow(await totalRow(data, template))
    worksheet = formatting(worksheet, template, data.length + 2)
    const image = await addImage(workbook, template)
    worksheet.addImage(image, {
        tl: { col: 9.25, row: 0.5 },
        br: { col: 10.9, row: 2.5 }
      })
    worksheet = topStyling(worksheet, template)
    for (var d in data) {
        worksheet.getRow((d*1)+5).height = 50
    }
    let buffer
    if (pdf) {
    } else {
        buffer = await workbook.xlsx.writeBuffer()
    }
    return buffer
}

async function totalRow (data, template) {
    const row = {}
    if (template === 'MyList') {
        const sums = await assetSums(data)
        row.rent = sums.rent.sum
        row.price = sums.price.sum
        row.yield = sums.yield.avg / 100
        row.subsectors = 'Total / Average'
    }
    return row
}

function getRow (data, template, totalRow, totals) {
    const row = {}
    if (template === 'MyList') {
        try {
            if (data.base.postcode) {
                row.address = `${data.base.town}, ${data.base.region} ${data.base.postcode}`
                row.latlng = `[${data.base.loc.coordinates[1]}, ${data.base.loc.coordinates[0]}]`
                row.maplink = `https://www.google.com/maps/place/${data.base.loc.coordinates[1]},${data.base.loc.coordinates[0]}`
            } else {
                row.address = '-'
                row.latlng = '-'
                row.maplink = '-'
            }
        } catch {
            row.address = '-'
            row.latlng = '-'
            row.maplink = '-'
        }
        try {
            if (data.meta.dateCreated) {
                row.date = data.meta.dateCreated.slice(0, 10)
            } else {
                row.date = '-'
            }
        } catch {
            row.date = '-'
        }
        try {
            if (data.sectors[0]) {
                row.sectors = ''
                for (var s in data.sectors) {
                    row.sectors = row.sectors + data.sectors[s].sector + ', '
                }
                row.sectors = row.sectors.slice(0, -2)
            } else {
                row.sectors = '-'
            }
        } catch {
            row.sectors = '-'
        }
        try {
            if (data.subsectors[0]) {
                row.subsectors = ''
                for (var sub in data.subsectors) {
                    row.subsectors = row.subsectors + data.subsectors[sub].subSector + ', '
                }
                row.subsectors = row.subsectors.slice(0, -2)
            } else {
                row.subsectors = '-'
            }
        } catch {
            row.subsectors = '-'
        }
        try {
            if (data.figures.rent) {
                row.rent = data.figures.rent
            } else {
                row.rent = '-'
            }
        } catch {
            row.rent = '-'
        }
        try {
            if (data.figures.price) {
                row.price = data.figures.price
            } else {
                row.price = '-'
            }
        } catch {
            row.price = '-'
        }
        try {
            if (data.figures.yield) {
                row.yield = data.figures.yield / 100
            } else {
                row.yield = '-'
            }
        } catch {
            row.yield = '-'
        }
        try {
            if (data.base.filename) {
                let url = ''
                if (data.base.portfolio === '1') {
                    url = data.base.filename.slice(0, data.base.filename.indexOf('portcount'))
                } else {
                    url = `https://trakr.blob.core.windows.net/trakrbrochures/${data.base.filename}.pdf`
                }
                row.brochure = url
            } else {
                row.brochure = '-'
            }
        } catch {
            row.brochure = '-'
        }
    }
    return row
}

function formatting (worksheet, template, lastRow) {
    if (template === 'MyList') {
        for (var c in columnProperties.MyList) {
            const col = worksheet.getColumn(columnProperties.MyList[c].key)
            col.eachCell({ includeEmpty: true }, function (cell, rowNumber) {
                cell.alignment = columnProperties.MyList[c].alignment
                // styling header
                if (rowNumber === 1) {
                    cell.font = stylingProperties.MyList.header.font
                    cell.fill = stylingProperties.MyList.header.fill
                }
                // style even rows
                if (rowNumber % 2 === 0) {
                    cell.fill = stylingProperties.MyList.evenRow.fill
                }
            })
            // styling all columns with links
            for (var l in stylingProperties.MyList.links) {
                if (stylingProperties.MyList.links[l].key === columnProperties.MyList[c].key) {
                    col.eachCell({ includeEmpty: true }, function (cell, rowNumber) {
                        if (rowNumber !== 1) {
                            cell.value = {
                                text: stylingProperties.MyList.links[l].text,
                                hyperlink: cell._value.model.value,
                            }
                            cell.font = stylingProperties.MyList.links[l].font
                        }
                    })
                }
            }
        }
        // format final row
        const finalRow = worksheet.getRow(lastRow)
        finalRow.eachCell({ includeEmpty: true }, function (cell) {
            cell.font = stylingProperties.MyList.header.font
            cell.fill = stylingProperties.MyList.header.fill
            if (cell._column.key === 'brochure' || cell._column.key === 'maplink') {
                cell.value = ''
            }
        })
    }
    return worksheet
}

function topStyling (worksheet, template) {
    worksheet.insertRow(1, {})
    worksheet.insertRow(1, [topStylingProperties[template].title])
    worksheet.insertRow(1, [new Date()])
    worksheet.mergeCells(`A2:${alphabet[columnProperties[template].length - 1]}2`)
    worksheet.getCell('A2').alignment = { vertical: 'middle', horizontal: 'center' }
    worksheet.getCell('A2').font = {
        color: { argb: '214b62' },
        family: 2,
        size: 16,
        bold: true,
        underline: true,
    }
    return worksheet
}

async function addImage (workbook, template) {
    const image = await workbook.addImage({
        buffer: fs.readFileSync(excelImage[template].path),
        extension: excelImage[template].extension,
    })
    return image
}

module.exports.createExcel = createExcel
