from colorthief import ColorThief
from colorsys import rgb_to_hls, hls_to_rgb
import requests
from io import BytesIO


def lighten_color(color, lighten_degree=0.2):
    """
    Lightens an RGB color by a specified degree.
    Args:
        color (tuple): RGB tuple, e.g., (255, 200, 100).
        lighten_degree (float): Amount to lighten the color (0-1).
    Returns:
        tuple: Lightened RGB tuple.
    """
    # Convert RGB to HLS
    r, g, b = [x / 255.0 for x in color]
    h, l, s = rgb_to_hls(r, g, b)

    # Increase lightness
    l = min(1, l + lighten_degree)

    # Convert back to RGB
    r, g, b = hls_to_rgb(h, l, s)
    return int(r * 255), int(g * 255), int(b * 255)


def get_colors_from_image(image_url, lighten_degree=0.2):
    """
    Extracts the dominant color from an image and returns a lightened color.
    Args:
        image_url (str): URL of the image.
        lighten_degree (float): Degree to lighten the color (0-1).
    Returns:
        dict: Dictionary with `backgroundColor` and `borderColor`.
    """
    # Fetch the image from the URL
    response = requests.get(image_url)
    if response.status_code != 200:
        raise Exception("Failed to fetch image from URL")

    # Load the image into ColorThief
    image = BytesIO(response.content)
    color_thief = ColorThief(image)

    # Get the dominant color
    dominant_color = color_thief.get_color(quality=1)

    # Lighten the dominant color
    lightened_color = lighten_color(dominant_color, lighten_degree)

    # Convert colors to CSS-friendly formats
    dominant_color_str = f"rgb({dominant_color[0]}, {
        dominant_color[1]}, {dominant_color[2]})"
    lightened_color_str = f"rgb({lightened_color[0]}, {
        lightened_color[1]}, {lightened_color[2]})"

    return {
        "backgroundColor": lightened_color_str,
        "borderColor": dominant_color_str,
    }
