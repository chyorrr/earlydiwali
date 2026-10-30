export interface IdCardData {
  name: string;
  phone: string;
  photoUrl?: string | null;
  outfitColor?: string | null;
}

/**
 * Generates a high-resolution (720x1080 px) VIP Festival Identity Card PNG
 * using HTML5 Canvas and triggers browser download.
 */
function drawFittedText(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  initialFontSize: number,
  fontFamily: string,
  fontWeight = 'bold'
): number {
  let size = initialFontSize;
  ctx.font = `${fontWeight} ${size}px ${fontFamily}`;
  while (ctx.measureText(text).width > maxWidth && size > 9) {
    size -= 1;
    ctx.font = `${fontWeight} ${size}px ${fontFamily}`;
  }
  ctx.fillText(text, x, y);
  return size;
}

export async function downloadVipIdCard(data: IdCardData): Promise<void> {
  // Ensure custom web fonts are fully parsed and ready for canvas 2D context
  if (typeof document !== 'undefined' && 'fonts' in document) {
    try {
      await document.fonts.ready;
    } catch {
      // Ignore font readiness error
    }
  }

  const canvas = document.createElement('canvas');
  canvas.width = 720;
  canvas.height = 1080;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const width = canvas.width;
  const height = canvas.height;

  // 1. Base Card Background (Warm Cream)
  ctx.fillStyle = '#FFF0D2';
  ctx.fillRect(0, 0, width, height);

  // Subtle Halftone Dots
  ctx.fillStyle = 'rgba(23, 23, 20, 0.04)';
  for (let x = 16; x < width; x += 22) {
    for (let y = 16; y < height; y += 22) {
      ctx.beginPath();
      ctx.arc(x, y, 1.8, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  // 2. Thick Outer Border & Inner Crimson Margin
  ctx.strokeStyle = '#171714';
  ctx.lineWidth = 10;
  ctx.strokeRect(12, 12, width - 24, height - 24);

  ctx.strokeStyle = '#D92720';
  ctx.lineWidth = 3;
  ctx.strokeRect(26, 26, width - 52, height - 52);

  // 3. Lanyard Punch Hole at Top Center
  ctx.fillStyle = '#171714';
  const punchW = 120;
  const punchH = 24;
  const punchX = (width - punchW) / 2;
  const punchY = 40;
  ctx.beginPath();
  ctx.roundRect(punchX, punchY, punchW, punchH, 12);
  ctx.fill();

  ctx.fillStyle = '#444';
  ctx.beginPath();
  ctx.roundRect(punchX + 30, punchY + 6, punchW - 60, punchH - 12, 6);
  ctx.fill();

  // 4. Header: EARLY DIWALI AT AARYA'S
  ctx.textAlign = 'center';
  ctx.fillStyle = '#D92720';
  drawFittedText(
    ctx,
    "EARLY DIWALI AT AARYA'S",
    width / 2,
    115,
    width - 80,
    42,
    '"Barlow Condensed", sans-serif',
    '900'
  );

  // Subtitle Strip
  ctx.fillStyle = '#171714';
  ctx.beginPath();
  ctx.roundRect(46, 134, width - 92, 34, 6);
  ctx.fill();

  ctx.fillStyle = '#FFC928';
  drawFittedText(
    ctx,
    '★ OFFICIAL VIP FESTIVAL IDENTITY PASS • NO. 0402 ★',
    width / 2,
    157,
    width - 110,
    15,
    '"Barlow Condensed", sans-serif',
    '900'
  );

  // 5. Photo Box (Left) and Key Info (Right)
  const photoX = 50;
  const photoY = 192;
  const photoW = 280;
  const photoH = 340;

  // Photo Frame Background
  ctx.fillStyle = '#171714';
  ctx.beginPath();
  ctx.roundRect(photoX - 4, photoY - 4, photoW + 8, photoH + 8, 16);
  ctx.fill();

  if (data.photoUrl) {
    try {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      await new Promise<void>((resolve, reject) => {
        img.onload = () => resolve();
        img.onerror = () => reject();
        img.src = data.photoUrl!;
      });

      // Clip image inside rounded rect
      ctx.save();
      ctx.beginPath();
      ctx.roundRect(photoX, photoY, photoW, photoH, 12);
      ctx.clip();

      // Cover scaling
      const imgRatio = img.width / img.height;
      const targetRatio = photoW / photoH;
      let drawW = photoW;
      let drawH = photoH;
      let offsetX = photoX;
      let offsetY = photoY;

      if (imgRatio > targetRatio) {
        drawW = photoH * imgRatio;
        offsetX = photoX - (drawW - photoW) / 2;
      } else {
        drawH = photoW / imgRatio;
        offsetY = photoY - (drawH - photoH) / 2;
      }

      ctx.drawImage(img, offsetX, offsetY, drawW, drawH);
      ctx.restore();
    } catch {
      // Fallback if image failed to load
      drawAvatarFallback(ctx, photoX, photoY, photoW, photoH);
    }
  } else {
    drawAvatarFallback(ctx, photoX, photoY, photoW, photoH);
  }

  // Photo Holographic Tag
  ctx.fillStyle = '#FFC928';
  ctx.strokeStyle = '#171714';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.roundRect(photoX + 16, photoY + photoH - 36, photoW - 32, 28, 14);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = '#171714';
  ctx.font = '900 13px "Barlow Condensed", sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('★ 100% VERIFIED GUEST ID ★', photoX + photoW / 2, photoY + photoH - 17);

  // 6. Right Side Pass Details
  const infoX = 360;
  ctx.textAlign = 'left';

  // NAME
  ctx.fillStyle = '#D92720';
  ctx.font = '900 13px "Barlow Condensed", sans-serif';
  ctx.fillText('PASS HOLDER', infoX, 222);

  ctx.fillStyle = '#171714';
  const nameToDraw = (data.name.trim() || "AARYA'S VIP GUEST").toUpperCase();
  drawFittedText(
    ctx,
    nameToDraw,
    infoX,
    254,
    width - infoX - 36,
    30,
    '"Barlow Condensed", sans-serif',
    '900'
  );

  // PHONE
  ctx.fillStyle = '#D92720';
  ctx.font = '900 13px "Barlow Condensed", sans-serif';
  ctx.fillText('WHATSAPP NUMBER', infoX, 296);

  ctx.fillStyle = '#171714';
  drawFittedText(
    ctx,
    data.phone.trim() || 'VERIFIED ON RSVP',
    infoX,
    324,
    width - infoX - 36,
    19,
    '"Plus Jakarta Sans", sans-serif',
    'bold'
  );

  // OUTFIT CODE (Optional)
  ctx.fillStyle = '#D92720';
  ctx.font = '900 13px "Barlow Condensed", sans-serif';
  ctx.fillText('FESTIVE FIT CODE', infoX, 366);

  ctx.fillStyle = '#075B36';
  drawFittedText(
    ctx,
    data.outfitColor || 'MAIN CHARACTER ENERGY',
    infoX,
    394,
    width - infoX - 36,
    20,
    '"Barlow Condensed", sans-serif',
    '900'
  );

  // ACCESS LEVEL
  ctx.fillStyle = '#D92720';
  ctx.font = '900 13px "Barlow Condensed", sans-serif';
  ctx.fillText('ACCESS CLEARANCE', infoX, 434);

  ctx.fillStyle = '#171714';
  ctx.font = 'bold 14px "Plus Jakarta Sans", sans-serif';
  ctx.fillText('ALL ACCESS • TERRACE • FOOD • MUSIC', infoX, 458);
  ctx.fillText('CARDS • UNLIMITED MITHAI', infoX, 480);

  // 7. Middle Dividing Banner: HAVE FUN & RULES
  const bannerY = 556;
  const bannerH = 80;
  const bannerX = 40;
  const bannerW = width - 80; // 640px wide, centered

  ctx.fillStyle = '#FFC928';
  ctx.strokeStyle = '#171714';
  ctx.lineWidth = 3.5;
  ctx.beginPath();
  ctx.roundRect(bannerX, bannerY, bannerW, bannerH, 16);
  ctx.fill();
  ctx.stroke();

  ctx.textAlign = 'center';
  ctx.fillStyle = '#171714';

  const funTitle = 'HAVE FUN! NO EXCUSES ACCEPTED • GOOD VIBES ONLY';
  drawFittedText(
    ctx,
    funTitle,
    width / 2,
    bannerY + 34,
    bannerW - 36, // comfortable inner padding
    21,
    '"Barlow Condensed", sans-serif',
    '900'
  );

  const funSubline = 'Unlimited mithai, terrace celebration & questionable dance moves.';
  drawFittedText(
    ctx,
    funSubline,
    width / 2,
    bannerY + 60,
    bannerW - 36,
    14,
    '"Playfair Display", Georgia, serif',
    'italic bold'
  );

  // 8. Event Coordinates Block
  const coordY = 656;
  const coordH = 166;
  const coordX = 40;
  const coordW = width - 80;

  ctx.fillStyle = '#171714';
  ctx.beginPath();
  ctx.roundRect(coordX, coordY, coordW, coordH, 16);
  ctx.fill();

  ctx.textAlign = 'left';
  // Time Row
  ctx.fillStyle = '#FFC928';
  ctx.font = '900 14px "Barlow Condensed", sans-serif';
  ctx.fillText('TIME & DATE', coordX + 24, coordY + 32);

  ctx.fillStyle = '#FFFFFF';
  ctx.font = 'bold 17px "Plus Jakarta Sans", sans-serif';
  ctx.fillText('Saturday, 31st October 2026 • 5:30 PM Onwards', coordX + 24, coordY + 58);

  // Venue Row
  ctx.fillStyle = '#FFC928';
  ctx.font = '900 14px "Barlow Condensed", sans-serif';
  ctx.fillText('VENUE COORDINATES', coordX + 24, coordY + 98);

  ctx.fillStyle = '#FFFFFF';
  drawFittedText(
    ctx,
    '402, Sumit Pramukh Enclave, Bachhani Nagar, Malad East',
    coordX + 24,
    coordY + 124,
    coordW - 48,
    17,
    '"Plus Jakarta Sans", sans-serif',
    'bold'
  );

  ctx.fillStyle = '#FFC928';
  ctx.font = 'italic 14px "Playfair Display", serif';
  ctx.fillText('Hosted by Aarya and Family', coordX + 24, coordY + 148);

  // 9. "ACCEPTED BY AARYA" Circular Retro Rubber Stamp (Overlapping bottom right of details)
  ctx.save();
  ctx.translate(560, 480);
  ctx.rotate(-0.2); // ~ -12 deg

  // Outer red circle
  ctx.strokeStyle = '#D92720';
  ctx.lineWidth = 4.5;
  ctx.beginPath();
  ctx.arc(0, 0, 70, 0, Math.PI * 2);
  ctx.stroke();

  // Inner dashed circle
  ctx.strokeStyle = '#D92720';
  ctx.lineWidth = 2;
  ctx.setLineDash([5, 4]);
  ctx.beginPath();
  ctx.arc(0, 0, 62, 0, Math.PI * 2);
  ctx.stroke();
  ctx.setLineDash([]);

  // Stamp Text
  ctx.textAlign = 'center';
  ctx.fillStyle = '#D92720';
  ctx.font = '900 13px "Barlow Condensed", sans-serif';
  ctx.fillText('★ 100% DESI ★', 0, -32);

  ctx.font = '900 24px "Barlow Condensed", Arial Black, sans-serif';
  ctx.fillText('ACCEPTED', 0, -6);
  ctx.fillText('BY AARYA', 0, 18);

  ctx.font = 'bold 11px "Barlow Condensed", sans-serif';
  ctx.fillText('ENTRY VERIFIED 2026', 0, 40);
  ctx.restore();

  // 10. Barcode & Security Strip at Bottom
  const barY = 860;
  ctx.strokeStyle = '#171714';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(50, barY);
  ctx.lineTo(width - 50, barY);
  ctx.stroke();

  // Draw realistic barcode lines
  const barX = 70;
  ctx.fillStyle = '#171714';
  const barPattern = [4, 2, 5, 1, 3, 2, 6, 1, 4, 3, 2, 5, 2, 4, 1, 6, 3, 2, 5, 1, 4, 3, 2, 6, 1, 3, 4, 2, 5, 3, 1, 4, 2, 5, 1, 6, 2, 3, 4, 1, 5, 2, 4, 3, 2, 5];
  let curX = barX;
  for (let i = 0; i < barPattern.length; i++) {
    const w = barPattern[i];
    if (i % 2 === 0) {
      ctx.fillRect(curX, barY + 16, w, 52);
    }
    curX += w + 2.5;
  }

  // Pass Security ID Code
  ctx.textAlign = 'center';
  ctx.fillStyle = '#171714';
  ctx.font = 'bold 14px monospace';
  ctx.fillText('DS-2026-MALAD-530PM-AARYA-VIP-0402', width / 2, barY + 95);

  ctx.fillStyle = '#777';
  ctx.font = '12px "Plus Jakarta Sans", sans-serif';
  ctx.fillText('Present this pass at 402 Sumit Pramukh Enclave • Shubh Aagman!', width / 2, barY + 120);

  // 11. Trigger Download
  const dataUrl = canvas.toDataURL('image/png');
  const link = document.createElement('a');
  link.download = `Aaryas-Diwali-VIP-Pass-${(data.name.trim() || 'Guest').replace(/\s+/g, '-')}.png`;
  link.href = dataUrl;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

function drawAvatarFallback(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number
) {
  ctx.fillStyle = '#0F3D27';
  ctx.beginPath();
  ctx.roundRect(x, y, w, h, 12);
  ctx.fill();

  // Head & shoulders silhouette
  ctx.fillStyle = '#FFC928';
  ctx.beginPath();
  ctx.arc(x + w / 2, y + h / 2 - 30, 50, 0, Math.PI * 2);
  ctx.fill();

  ctx.beginPath();
  ctx.ellipse(x + w / 2, y + h + 20, 85, 75, 0, 0, Math.PI * 2);
  ctx.fill();
}
