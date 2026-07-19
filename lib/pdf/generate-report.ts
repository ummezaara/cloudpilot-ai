"use client";

import jsPDF from "jspdf";

import {
  DASHBOARD_SERVICES,
  DEMO_COST_ESTIMATE,
  DEMO_COST_LEVEL,
  DEMO_TERRAFORM,
  DIAGRAM_NODES,
  DIAGRAM_EDGES,
  type ServiceCategory,
} from "@/config/architecture-demo";

const CATEGORY_HEX: Record<ServiceCategory, string> = {
  compute: "#FF9900",
  network: "#4F8CFF",
  storage: "#34D399",
  security: "#FB7185",
};

function hexToRgb(hex: string) {
  return {
    r: parseInt(hex.slice(1, 3), 16),
    g: parseInt(hex.slice(3, 5), 16),
    b: parseInt(hex.slice(5, 7), 16),
  };
}

/**
 * Builds and downloads a PDF report for the currently generated architecture.
 * Draws the diagram as vector shapes from DIAGRAM_NODES/DIAGRAM_EDGES rather
 * than rasterizing the on-screen SVG, so no extra screenshot dependency
 * (e.g. html2canvas) is needed and the output stays crisp at any zoom.
 */
export function generateArchitecturePdf(requirement: string) {
  const doc = new jsPDF({ unit: "pt", format: "a4" });
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 44;
  const contentWidth = pageWidth - margin * 2;
  let y = 0;

  const ensureSpace = (needed: number) => {
    if (y + needed > pageHeight - 50) {
      doc.addPage();
      y = 50;
    }
  };

  // --- Branding header -------------------------------------------------
  doc.setFillColor(10, 13, 20);
  doc.rect(0, 0, pageWidth, 68, "F");
  doc.setTextColor(255, 153, 0);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  doc.text("CloudPilot AI", margin, 40);
  doc.setTextColor(210, 214, 222);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.text("AI-Generated AWS Architecture Report", margin, 56);
  doc.setTextColor(140, 146, 158);
  doc.setFontSize(8.5);
  doc.text(new Date().toLocaleDateString(), pageWidth - margin, 40, { align: "right" });

  y = 96;
  doc.setTextColor(20, 20, 24);

  // --- Requirement -------------------------------------------------------
  doc.setFont("helvetica", "bold");
  doc.setFontSize(13);
  doc.text("Requirement", margin, y);
  y += 18;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  const reqLines: string[] = doc.splitTextToSize(requirement, contentWidth);
  doc.text(reqLines, margin, y);
  y += reqLines.length * 13 + 22;

  // --- AWS Services --------------------------------------------------
  ensureSpace(28 + DASHBOARD_SERVICES.length * 14);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(13);
  doc.text("Recommended AWS Services", margin, y);
  y += 18;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9.5);
  DASHBOARD_SERVICES.forEach((service) => {
    ensureSpace(14);
    doc.setTextColor(20, 20, 24);
    doc.text(`•  ${service.name} — ${service.description}`, margin, y);
    y += 14;
  });
  y += 14;

  // --- Architecture Diagram (drawn as vectors from the shared node/edge data) ---
  const diagramHeight = 170;
  ensureSpace(diagramHeight + 40);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(13);
  doc.setTextColor(20, 20, 24);
  doc.text("Architecture Diagram", margin, y);
  y += 16;

  const diagramTop = y;
  const scaleX = (pct: number) => margin + (pct / 100) * contentWidth;
  const scaleY = (pct: number) => diagramTop + (pct / 100) * diagramHeight;

  doc.setDrawColor(200, 203, 210);
  doc.setLineWidth(0.75);
  DIAGRAM_EDGES.forEach((edge) => {
    const from = DIAGRAM_NODES.find((n) => n.id === edge.from)!;
    const to = DIAGRAM_NODES.find((n) => n.id === edge.to)!;
    doc.line(scaleX(from.x), scaleY(from.y), scaleX(to.x), scaleY(to.y));
  });

  DIAGRAM_NODES.forEach((node) => {
    const cx = scaleX(node.x);
    const cy = scaleY(node.y);
    const rgb = hexToRgb(CATEGORY_HEX[node.category]);
    doc.setFillColor(rgb.r, rgb.g, rgb.b);
    doc.circle(cx, cy, 6, "F");
    doc.setFont("helvetica", "normal");
    doc.setFontSize(7.5);
    doc.setTextColor(70, 74, 84);
    doc.text(node.label, cx, cy + 16, { align: "center" });
  });

  y = diagramTop + diagramHeight + 30;

  // --- Cost Estimate -------------------------------------------------
  ensureSpace(50);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(13);
  doc.setTextColor(20, 20, 24);
  doc.text("Cost Estimate", margin, y);
  y += 18;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.text(`Estimated Monthly Cost: ${DEMO_COST_ESTIMATE}  ·  Level: ${DEMO_COST_LEVEL}`, margin, y);
  y += 30;

  // --- Terraform Preview -----------------------------------------------
  ensureSpace(30);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(13);
  doc.text("Terraform Preview", margin, y);
  y += 18;
  doc.setFont("courier", "normal");
  doc.setFontSize(8.5);
  doc.setTextColor(40, 40, 46);
  DEMO_TERRAFORM.split("\n").forEach((line) => {
    ensureSpace(11);
    doc.text(line, margin, y);
    y += 11;
  });

  // --- Footer branding on every page -------------------------------------
  const pageCount = doc.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.setTextColor(150, 154, 164);
    doc.text(
      `Generated by CloudPilot AI  ·  Page ${i} of ${pageCount}`,
      margin,
      pageHeight - 24
    );
  }

  doc.save("cloudpilot-architecture-report.pdf");
}
