from jinja2 import Template
import pdfkit
import json
from CBIR_REVISED import Cbir_Color

TEMPLATE_FILE = "PDF.html"

def export_pdf():
    similarity_arr, time = Cbir_Color()

    # Gathering image data
    image_objects = []
    for item in similarity_arr:
        image_objects.append({
            "url": f"D:/IF2121_TB_02/back-end/uploads{item['url']}",
            "percentage": item["percentage"]
        })

    # Adding total time executed information
    image_objects.append({
        "url": "Total Execution Time:",
        "percentage": f"{time} seconds"
    })

    template_html = """
    <!DOCTYPE html>
    <html>
    <head>
        <style>
            table {
                width: 100%;
                border-collapse: collapse;
            }
            th, td {
                border: 1px solid black;
                padding: 8px;
                text-align: left;
            }
            .image {
                width: 200px;
                height: 200px;
            }
        </style>
    </head>
    <body>
        <h1>Image Data</h1>
        <table>
            <tr>
                <th>URL</th>
                <th>Percentage</th>
            </tr>
            {% for item in data %}
            <tr>
                <td>{% if "Total Execution Time" in item.url %}
                    <strong>{{ item.url }}</strong>
                    {% else %}
                    <img src="{{ item.url }}" alt="Image1" class="image">
                    {% endif %}
                </td>
                <td>{{ item.percentage }}</td>
            </tr>
            {% endfor %}
        </table>
    </body>
    </html>
    """

    # Load the template
    template = Template(template_html)
    options = {
        'page-size': 'A4',
        'encoding': "UTF-8",
        'enable-local-file-access': '',
    }

    # Render the template with the JSON data
    rendered_content = template.render(data=image_objects)

    # Generate PDF
    pdfkit.from_string(rendered_content, 'template-output.pdf', options=options)
