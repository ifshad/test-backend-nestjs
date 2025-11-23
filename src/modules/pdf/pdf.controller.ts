import { Controller, Get, Res } from '@nestjs/common';
import { PdfService } from './pdf.service';
import type { Response } from 'express';

@Controller('pdf')
export class PdfController {
  constructor(private readonly pdfService: PdfService) {}

  @Get('generate-pdf')
  async genertePdf(@Res() res: Response) {
    const pdf = await this.pdfService.generatePdf();

    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'inline; filename="preview.pdf"',
      'Content-Length': pdf.length,
    });

    res.send(pdf);
  }
}
