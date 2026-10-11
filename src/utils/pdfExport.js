import { tanggalPanjang } from './formatters.js'

// Pustaka PDF dimuat dinamis supaya tidak membebani LCP.
export async function exportPDF({ t = (x) => x, judul, params, ringkasan, kolom, baris, namaFile }) {
  const { jsPDF } = await import('jspdf')
  const autoTable = (await import('jspdf-autotable')).default
  const doc = new jsPDF({ unit: 'pt', format: 'a4' })
  const W = doc.internal.pageSize.getWidth()

  doc.setFillColor(16, 185, 129)
  doc.roundedRect(40, 32, 34, 34, 8, 8, 'F')
  doc.setTextColor(255, 255, 255).setFont('helvetica', 'bold').setFontSize(16).text('K', 52, 55)
  doc.setTextColor(15, 23, 42).text('KalkulatorKeuangan.id', 84, 47)
  doc.setFont('helvetica', 'normal').setFontSize(9).setTextColor(100, 100, 100)
  doc.text(t('Simulasi keuangan gratis dan instan'), 84, 61)
  doc.text(tanggalPanjang(), W - 40, 47, { align: 'right' })
  doc.setDrawColor(16, 185, 129).setLineWidth(1.5).line(40, 78, W - 40, 78)
  doc.setTextColor(15, 23, 42).setFont('helvetica', 'bold').setFontSize(14).text(t(judul), 40, 104)

  const half = { left: 40, right: W / 2 }
  autoTable(doc, { startY: 116, head: [[t('Parameter'), t('Nilai')]], body: params.map((r) => r.map((c) => t(c))), theme: 'grid',
    headStyles: { fillColor: [37, 99, 235] }, styles: { fontSize: 9 }, margin: half })
  autoTable(doc, { startY: doc.lastAutoTable.finalY + 14, head: [[t('Ringkasan hasil'), '']], body: ringkasan.map((r) => r.map((c) => t(c))), theme: 'grid',
    headStyles: { fillColor: [16, 185, 129] }, styles: { fontSize: 9, fontStyle: 'bold' }, margin: half })
  autoTable(doc, { startY: doc.lastAutoTable.finalY + 18, head: [kolom.map((c) => t(c))], body: baris.map((r) => r.map((c) => t(c))), theme: 'striped',
    headStyles: { fillColor: [16, 185, 129] }, styles: { fontSize: 8, halign: 'right' },
    columnStyles: { 0: { halign: 'left' } }, margin: { left: 40, right: 40 } })

  const n = doc.getNumberOfPages()
  for (let i = 1; i <= n; i++) {
    doc.setPage(i).setFontSize(8).setTextColor(130, 130, 130)
    doc.text(t('Hasil simulasi bersifat estimasi dan bukan nasihat keuangan.'), 40, 822)
    doc.text(`${t('Halaman')} ${i}/${n}`, W - 40, 822, { align: 'right' })
  }
  doc.save(`${namaFile}.pdf`)
}
