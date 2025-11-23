import { Injectable } from '@nestjs/common';
import { Template, BLANK_PDF, Font } from '@pdfme/common';
import { generate } from '@pdfme/generator';
import { multiVariableText, barcodes, image } from '@pdfme/schemas';
import * as fs from 'fs';
import path from 'path';

@Injectable()
export class PdfService {
  async generatePdf() {
    const fontFile = path.join(
      process.cwd(),
      'public',
      'fonts',
      'Li_Purno_Pran_Unicode.ttf',
    );

    const font: Font = {
      bangla: {
        data: fs.readFileSync(fontFile),
        fallback: true,
      },
    };

    const template: Template = {
      basePdf: BLANK_PDF,
      schemas: [
        [
          {
            name: 'banglaText',
            type: 'text',
            fontName: 'bangla',
            position: { x: 10, y: 10 },
            width: 180,
            height: 100,
          },
        ],
      ],
    };

    const inputs = [
      {
        banglaText:
          'বাংলা ভাষা বিশ্বের অন্যতম সমৃদ্ধশালী ভাষা; এর হাজার বছরের ইতিহাস, সাহিত্য ও সংস্কৃতির গভীর শিকড় রয়েছে। আধুনিক প্রযুক্তির যুগে বিভিন্ন ডিজিটাল প্ল্যাটফর্মে বাংলা ব্যবহার দ্রুত বৃদ্ধি পেলেও এখনো অনেক সময় দেখা যায়—ইউনিকোড রেন্ডারিং, ফন্ট সাবসেটিং, লাইগেচার ও কার্নিং–সংক্রান্ত সমস্যার কারণে সঠিকভাবে বাংলা অক্ষরগুলো প্রদর্শিত হয় না। উদাহরণস্বরূপ, “ক্ষ”, “জ্ঞ”, “ত্র”, “শ্চ”, “হ্ম”, “ন্দ্র”, “ক্ট”, “ঞ্জ” ইত্যাদি যৌগিক বর্ণগুলো অনেক ফন্টে সঠিকভাবে রেন্ডার না-হওয়ায় পাঠযোগ্যতা কমে যায়। আবার দীর্ঘ বাক্যের ক্ষেত্রে স্বয়ংক্রিয় লাইন ব্রেকিং বা টেক্সট র‍্যাপিং ঠিকমতো কাজ না করলে পুরো ডিজাইন নষ্ট হয়ে যেতে পারে। এই কারণেই কোনো পিডিএফ জেনারেটর ব্যবহার করার সময় পরীক্ষিত ও মানসম্মত বাংলা ইউনিকোড ফন্ট ব্যবহার করা অত্যন্ত জরুরি। সঠিক টুল এবং সঠিক ফন্ট ব্যবহারের মাধ্যমে যেকোনো ডকুমেন্টে বাংলা ভাষার সৌন্দর্য, শৈলী এবং পাঠযোগ্যতা অনায়াসে বজায় রাখা সম্ভব।',
      },
    ];

    const pdf = await generate({ template, inputs, options: { font } });
    return pdf;
  }
}
