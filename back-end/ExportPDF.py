import jinja2
import pdfkit

TEMPLATE_FILE = "PDF.html"

def export_pdf(sum, time, list_image, list_percentage):
    
    # Dummy data
    sum = 3
    time = 0.5
    
    # ! HARDCODED
    #TODO : Change to dynamic
    context = {
        'Image1': "D:/IF2121_TB_02/back-end" + "/uploads/data-set/1.jpg",
        'Image2': "D:/IF2121_TB_02/back-end" + "/uploads/data-set/2.jpg",
        'Image3': "D:/IF2121_TB_02/back-end" + "/uploads/data-set/3.jpg",
        'Percentage1': "50%",
        'Percentage2': "50%",
        'Percentage3': "50%",
        'sum_image' : f'{sum}',
        'time' : f'{time}',
    }
    
    # Get the template
    templateLoader = jinja2.FileSystemLoader("./")
    templateEnv = jinja2.Environment(loader=templateLoader)
    template = templateEnv.get_template(TEMPLATE_FILE)

    outputText = template.render(context)

    options = {
        'page-size': 'A4',
        'enable-local-file-access': None,
    }
    
    config = pdfkit.configuration(wkhtmltopdf=r'C:\Program Files\wkhtmltopdf\bin\wkhtmltopdf.exe')

    # Convert to PDF
    pdfkit.from_string(outputText, 'template-output.pdf', configuration=config, options=options, css="./PDFC.css")


