import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { RouterTestingModule } from '@angular/router/testing';

const mockTitle = 'Ecommerce teste'

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {

    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [HeaderComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    component.title = mockTitle;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contain title', () => {
    const header: HTMLHeadingElement = fixture.nativeElement.querySelector('header');
    expect(header.textContent).toBe(mockTitle);

    component.title = 'Outro titulo';
    fixture.detectChanges() //Indica para o componente que teve uma mudança, isso no teste é necessário
    expect(header.textContent).toBe('Outro titulo');
  });

  it('should redirect to "/" when logo is is clicked', () => {
    //pegando o elemento a
    const anchor: HTMLAnchorElement = fixture.nativeElement.querySelector('a');
    expect(anchor.getAttribute('href')).toBe('/');
  });
});
