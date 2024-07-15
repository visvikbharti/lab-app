from flask import Blueprint, jsonify, request
import numpy as np
import scipy.stats as stats

main = Blueprint('main', __name__)

@main.route('/')
def index():
    return jsonify({"message": "Welcome to the Lab App"})

@main.route('/analyze', methods=['POST'])
def analyze():
    try:
        data = request.json
        print('Received data:', data)  # Debugging
        sample1 = data.get('sample1', [])
        sample2 = data.get('sample2', [])
        if len(sample1) < 2 or len(sample2) < 2:
            return jsonify({"error": "Each sample must contain at least two values"}), 400
        t_stat, p_value = stats.ttest_ind(sample1, sample2)
        return jsonify({
            "t_stat": t_stat,
            "p_value": p_value
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500
