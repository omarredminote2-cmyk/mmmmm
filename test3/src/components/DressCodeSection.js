export class DressCodeSection {
  constructor(data) {
    this.data = data;
  }

  render() {
    const section = document.createElement("section");
    section.className = "py-16 md:py-20 px-6 relative overflow-hidden section-reveal";

    section.innerHTML = `
      <div class="max-w-xl mx-auto text-center">
        <!-- Shirt Icon -->
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="mx-auto text-primary mb-3"
        >
          <path d="M20.38 3.46 16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.47a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.47a2 2 0 0 0-1.34-2.23z"></path>
        </svg>

        <!-- Title -->
        <h2 class="font-calligraphy text-4xl md:text-5xl text-primary mb-2 text-center">
          Dress Code
        </h2>

        <!-- Divider Hn -->
        <div class="flex items-center justify-center gap-3 my-4">
          <div class="w-16 h-px bg-primary/30"></div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="10"
            height="10"
            viewBox="0 0 24 24"
            fill="currentColor"
            class="text-primary opacity-50"
          >
            <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
          </svg>
          <div class="w-16 h-px bg-primary/30"></div>
        </div>

        <!-- 2 Columns: Women & Men -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-xl mx-auto mt-8">
          <!-- Women Card -->
          <div class="text-center py-4 px-6 rounded-xl border border-primary/20 bg-primary/5 backdrop-blur-sm shadow-sm">
            <h3 class="font-display text-lg font-semibold mb-3 text-primary">
              Women
            </h3>
            <div class="w-10 h-px bg-primary/30 mx-auto mb-4"></div>
            <p class="text-muted-foreground text-sm leading-relaxed">
              ${this.data.dressCodeWomen}
            </p>
          </div>

          <!-- Men Card -->
          <div class="text-center py-4 px-6 rounded-xl border border-primary/20 bg-primary/5 backdrop-blur-sm shadow-sm">
            <h3 class="font-display text-lg font-semibold mb-3 text-primary">
              Men
            </h3>
            <div class="w-10 h-px bg-primary/30 mx-auto mb-4"></div>
            <p class="text-muted-foreground text-sm leading-relaxed">
              ${this.data.dressCodeMen}
            </p>
          </div>
        </div>
      </div>
    `;

    return section;
  }
}
