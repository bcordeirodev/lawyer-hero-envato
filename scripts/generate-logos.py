#!/usr/bin/env python3
"""
Gera logos otimizadas para o app LawyerHero:
- Thumbnail 80x80 (JPG): public/thumbnail-80x80.jpg
- Logo para header 64x64 (PNG): public/logo-header.png
- Favicon ICO: src/app/favicon.ico
"""

from PIL import Image
import os

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# Arquivos de entrada
LOGO_SEM_NOME = os.path.join(ROOT, 'public', 'logo.png')
LOGO_COM_NOME = os.path.join(ROOT, 'public', 'logo-com-logo.png')

# Arquivos de saída
THUMBNAIL_OUTPUT = os.path.join(ROOT, 'public', 'thumbnail-80x80.jpg')
LOGO_HEADER_OUTPUT = os.path.join(ROOT, 'public', 'logo-header.png')
FAVICON_OUTPUT = os.path.join(ROOT, 'src', 'app', 'favicon.ico')

def resize_with_padding(img, target_size, bg_color=(255, 255, 255, 0)):
    """Redimensiona mantendo proporção e adiciona padding se necessário"""
    # Calcular novo tamanho mantendo proporção
    img.thumbnail(target_size, Image.LANCZOS)
    
    # Criar canvas com fundo transparente/branco
    canvas = Image.new('RGBA', target_size, bg_color)
    
    # Centralizar imagem no canvas
    x = (target_size[0] - img.width) // 2
    y = (target_size[1] - img.height) // 2
    canvas.paste(img, (x, y), img if img.mode == 'RGBA' else None)
    
    return canvas

def generate_thumbnail():
    """Gera thumbnail 80x80 JPG da logo sem nome"""
    print("📸 Gerando thumbnail 80x80...")
    
    with Image.open(LOGO_SEM_NOME) as img:
        # Redimensionar para 80x80 com fundo branco
        thumb = resize_with_padding(img, (80, 80), (255, 255, 255, 255))
        
        # Converter para RGB e salvar como JPG
        thumb_rgb = thumb.convert('RGB')
        thumb_rgb.save(THUMBNAIL_OUTPUT, 'JPEG', quality=85, optimize=True)
        
        file_size = os.path.getsize(THUMBNAIL_OUTPUT) / 1024
        print(f"✅ Thumbnail salvo: {THUMBNAIL_OUTPUT} ({file_size:.1f}KB)")

def generate_header_logo():
    """Gera logo 64x64 PNG para o header"""
    print("🎨 Gerando logo para header 64x64...")
    
    with Image.open(LOGO_SEM_NOME) as img:
        # Redimensionar para 64x64 mantendo transparência
        header_logo = resize_with_padding(img, (64, 64))
        
        # Salvar como PNG com transparência
        header_logo.save(LOGO_HEADER_OUTPUT, 'PNG')
        
        file_size = os.path.getsize(LOGO_HEADER_OUTPUT) / 1024
        print(f"✅ Logo header salvo: {LOGO_HEADER_OUTPUT} ({file_size:.1f}KB)")

def generate_favicon():
    """Gera favicon ICO multi-tamanhos"""
    print("🔖 Gerando favicon ICO...")
    
    with Image.open(LOGO_SEM_NOME) as img:
        # Converter para RGBA se necessário
        if img.mode != 'RGBA':
            img = img.convert('RGBA')
        
        # Criar base quadrada (maior dimensão)
        max_side = max(img.width, img.height)
        base = Image.new('RGBA', (max_side, max_side), (0, 0, 0, 0))
        offset = ((max_side - img.width) // 2, (max_side - img.height) // 2)
        base.paste(img, offset, img)
        
        # Tamanhos para favicon
        sizes = [16, 32, 48, 64, 128, 256]
        
        # Salvar ICO
        base.save(FAVICON_OUTPUT, format='ICO', sizes=[(s, s) for s in sizes])
        
        file_size = os.path.getsize(FAVICON_OUTPUT) / 1024
        print(f"✅ Favicon salvo: {FAVICON_OUTPUT} ({file_size:.1f}KB)")

def main():
    print("🚀 Gerando logos otimizadas para LawyerHero...")
    
    # Verificar se arquivos de entrada existem
    if not os.path.exists(LOGO_SEM_NOME):
        print(f"❌ Logo sem nome não encontrada: {LOGO_SEM_NOME}")
        return
    
    # Criar diretórios se necessário
    os.makedirs(os.path.dirname(FAVICON_OUTPUT), exist_ok=True)
    
    # Gerar arquivos
    generate_thumbnail()
    generate_header_logo()
    generate_favicon()
    
    print("\n🎉 Logos geradas com sucesso!")
    print("\nArquivos criados:")
    print(f"  📸 Thumbnail 80x80: {THUMBNAIL_OUTPUT}")
    print(f"  🎨 Logo header 64x64: {LOGO_HEADER_OUTPUT}")
    print(f"  🔖 Favicon ICO: {FAVICON_OUTPUT}")
    print("\n💡 Para usar no header, importe: /logo-header.png")

if __name__ == '__main__':
    main()