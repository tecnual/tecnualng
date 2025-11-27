import { Component } from '@angular/core';
import { TngCardComponent } from 'tecnualng';
import { TngButton } from 'tecnualng';
import { CodeExampleComponent, CodeTab } from '../../components/code-example/code-example.component';

@Component({
  selector: 'app-card-demo',
  standalone: true,
  imports: [TngCardComponent, TngButton, CodeExampleComponent],
  template: `
    <div class="page-container">
      <h1>Card Component</h1>
      <p class="subtitle">Elegant, configurable card component with content projection</p>
      
      <div class="demo-section">
        <h2>Basic Cards</h2>
        <div class="card-row">
          <tng-card title="Simple Card">
            <p>This is a basic card with a title and content.</p>
          </tng-card>

          <tng-card title="Card with Subtitle" subtitle="This is a subtitle">
            <p>Cards can have both title and subtitle.</p>
          </tng-card>
        </div>
        
        <app-code-example [tabs]="basicCardCode"></app-code-example>
      </div>

      <div class="demo-section">
        <h2>Elevated and Outlined Cards</h2>
        <div class="card-row">
          <tng-card title="Elevated Card" [elevated]="true">
            <p>This card has a shadow and hover effect.</p>
          </tng-card>

          <tng-card title="Outlined Card" [outlined]="true">
            <p>This card has a border instead of a shadow.</p>
          </tng-card>
        </div>
        
        <app-code-example [tabs]="modifierCardCode"></app-code-example>
      </div>

      <div class="demo-section">
        <h2>Card Variants</h2>
        <div class="card-row">
          <tng-card title="Primary Card" variant="primary" [elevated]="true">
            <p>Primary variant with colored header.</p>
          </tng-card>

          <tng-card title="Secondary Card" variant="secondary" [elevated]="true">
            <p>Secondary variant with colored header.</p>
          </tng-card>

          <tng-card title="Success Card" variant="success" [elevated]="true">
            <p>Success variant for positive actions.</p>
          </tng-card>
        </div>

        <div class="card-row">
          <tng-card title="Warning Card" variant="warning" [elevated]="true">
            <p>Warning variant for cautionary messages.</p>
          </tng-card>

          <tng-card title="Error Card" variant="error" [elevated]="true">
            <p>Error variant for critical messages.</p>
          </tng-card>
        </div>
        
        <app-code-example [tabs]="variantCardCode"></app-code-example>
      </div>

      <div class="demo-section">
        <h2>Cards with Footer</h2>
        <div class="card-row">
          <tng-card title="Card with Actions" subtitle="Use footer projection for actions" [elevated]="true">
            <p>This card demonstrates content projection for the footer slot.</p>
            <div card-footer>
              <button tngButton variant="primary">Action</button>
              <button tngButton>Cancel</button>
            </div>
          </tng-card>

          <tng-card title="Custom Footer" [outlined]="true">
            <p>Footers can contain any content you want.</p>
            <div card-footer>
              <span style="color: var(--tng-text-secondary, #666); font-size: 0.875rem;">Last updated: Today</span>
            </div>
          </tng-card>
        </div>
        
        <app-code-example [tabs]="footerCardCode"></app-code-example>
      </div>

      <div class="demo-section">
        <h2>Cards with Images</h2>
        <div class="card-row">
          <tng-card 
            title="Beautiful Landscape" 
            subtitle="Nature photography"
            image="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=250&fit=crop"
            imageAlt="Mountain landscape"
            [elevated]="true">
            <p>Cards can display images at the top.</p>
            <div card-footer>
              <button tngButton variant="primary" icon="fa fa-heart">Like</button>
              <button tngButton icon="fa fa-share">Share</button>
            </div>
          </tng-card>

          <tng-card 
            title="Product Card" 
            variant="primary"
            image="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=250&fit=crop"
            imageAlt="Product image"
            [elevated]="true">
            <p>Perfect for product showcases.</p>
            <div card-footer>
              <button tngButton variant="primary">Buy Now</button>
            </div>
          </tng-card>
        </div>
        
        <app-code-example [tabs]="imageCardCode"></app-code-example>
      </div>

      <div class="demo-section">
        <h2>Custom Header Projection</h2>
        <div class="card-row">
          <tng-card [elevated]="true">
            <div card-header style="display: flex; align-items: center; gap: 12px;">
              <i class="fa fa-user" style="font-size: 2rem; color: var(--tng-primary);"></i>
              <div>
                <h3 style="margin: 0; font-size: 1.25rem;">Custom Header</h3>
                <p style="margin: 0; font-size: 0.875rem; color: var(--tng-text-secondary, #666);">With icon and custom layout</p>
              </div>
            </div>
            <p>You can project completely custom content into the header slot.</p>
          </tng-card>
        </div>
        
        <app-code-example [tabs]="customHeaderCardCode"></app-code-example>
      </div>
    </div>
  `,
  styles: [`
    .page-container {
      padding: 2rem;
      max-width: 1200px;
      margin: 0 auto;
    }
    
    h1 {
      font-size: 2rem;
      margin-bottom: 0.5rem;
      color: var(--tng-text, #333);
    }
    
    .subtitle {
      font-size: 1rem;
      color: var(--tng-text-secondary, #666);
      margin-bottom: 2rem;
    }
    
    .demo-section {
      margin-bottom: 3rem;
    }
    
    .demo-section h2 {
      font-size: 1.25rem;
      margin-bottom: 1rem;
      color: var(--tng-text, #333);
    }
    
    .card-row {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 1.5rem;
      margin-bottom: 1.5rem;
    }

    tng-card {
      min-height: 150px;
    }
  `]
})
export class CardDemoComponent {
  protected basicCardCode: CodeTab[] = [
    {
      label: 'HTML',
      language: 'html',
      code: `<tng-card title="Simple Card">
  <p>This is a basic card with a title and content.</p>
</tng-card>

<tng-card title="Card with Subtitle" subtitle="This is a subtitle">
  <p>Cards can have both title and subtitle.</p>
</tng-card>`
    }
  ];

  protected modifierCardCode: CodeTab[] = [
    {
      label: 'HTML',
      language: 'html',
      code: `<tng-card title="Elevated Card" [elevated]="true">
  <p>This card has a shadow and hover effect.</p>
</tng-card>

<tng-card title="Outlined Card" [outlined]="true">
  <p>This card has a border instead of a shadow.</p>
</tng-card>`
    }
  ];

  protected variantCardCode: CodeTab[] = [
    {
      label: 'HTML',
      language: 'html',
      code: `<tng-card title="Primary Card" variant="primary" [elevated]="true">
  <p>Primary variant with colored header.</p>
</tng-card>

<tng-card title="Success Card" variant="success" [elevated]="true">
  <p>Success variant for positive actions.</p>
</tng-card>`
    }
  ];

  protected footerCardCode: CodeTab[] = [
    {
      label: 'HTML',
      language: 'html',
      code: `<tng-card title="Card with Actions" [elevated]="true">
  <p>Content goes here.</p>
  <div card-footer>
    <button tngButton variant="primary">Action</button>
    <button tngButton>Cancel</button>
  </div>
</tng-card>`
    }
  ];

  protected imageCardCode: CodeTab[] = [
    {
      label: 'HTML',
      language: 'html',
      code: `<tng-card 
  title="Beautiful Landscape" 
  subtitle="Nature photography"
  image="https://example.com/image.jpg"
  imageAlt="Mountain landscape"
  [elevated]="true">
  <p>Cards can display images at the top.</p>
  <div card-footer>
    <button tngButton variant="primary">Like</button>
    <button tngButton>Share</button>
  </div>
</tng-card>`
    }
  ];

  protected customHeaderCardCode: CodeTab[] = [
    {
      label: 'HTML',
      language: 'html',
      code: `<tng-card [elevated]="true">
  <div card-header>
    <i class="fa fa-user"></i>
    <div>
      <h3>Custom Header</h3>
      <p>With icon and custom layout</p>
    </div>
  </div>
  <p>Custom header content projection.</p>
</tng-card>`
    }
  ];
}
