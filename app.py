from flask import Flask, request, jsonify
from moviepy.video.io.VideoFileClip import VideoFileClip
from sqlalchemy import create_engine, Column, Integer, String, Float, asc
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import os
import uuid
from datetime import datetime
from flask_cors import CORS  # Importando o CORS

app = Flask(__name__)
CORS(app)  # Habilita o CORS para permitir requisições de outros domínios (frontend)

# Configuração do limite de tamanho para upload (50 MB)
app.config['MAX_CONTENT_LENGTH'] = 50 * 1024 * 1024  # 50 MB

# Configuração do Banco de Dados
engine = create_engine('sqlite:///ranking.db')  # Banco de dados SQLite
Base = declarative_base()
Session = sessionmaker(bind=engine)
session = Session()

# Modelo para o Banco de Dados
class Player(Base):
    __tablename__ = 'players'
    id = Column(Integer, primary_key=True)
    name = Column(String)
    time = Column(Float)
    video_path = Column(String)
    timestamp = Column(String, default=datetime.utcnow)  # Armazena a data e hora do envio

Base.metadata.create_all(engine)

# Garantir que a pasta de uploads existe
UPLOAD_FOLDER = 'uploads'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# Endpoint de Envio de Vídeo
@app.route('/upload', methods=['POST'])
def upload():
    try:
        name = request.form['name']
        file = request.files['file']
        
        if not file or not file.filename.endswith('.mp4'):
            return jsonify({'error': 'Arquivo inválido! Apenas MP4 é permitido.'}), 400

        # Gerar um nome único para o arquivo
        unique_filename = f"{uuid.uuid4().hex}_{file.filename}"
        video_path = os.path.join(UPLOAD_FOLDER, unique_filename)
        file.save(video_path)

        # Calcula a duração do vídeo
        clip = VideoFileClip(video_path)
        duration = clip.duration  # Em segundos

        # Salva no banco
        player = Player(name=name, time=duration, video_path=video_path)
        session.add(player)
        session.commit()

        return jsonify({'message': 'Speed run enviada com sucesso!', 'time': format_time(duration)})

    except Exception as e:
        return jsonify({'error': str(e)}), 500

# Função para formatar o tempo em hh:mm:ss
def format_time(seconds):
    minutes, seconds = divmod(seconds, 60)
    hours, minutes = divmod(minutes, 60)
    return f"{int(hours):02}:{int(minutes):02}:{int(seconds):02}"

# Endpoint para Obter o Ranking
@app.route('/ranking', methods=['GET'])
def ranking():
    try:
        # Ordena pelo tempo e desempata pela data de envio (timestamp)
        players = session.query(Player).order_by(asc(Player.time), asc(Player.timestamp)).limit(10).all()
        return jsonify([{
            'name': p.name,
            'time': format_time(p.time),  # Exibir tempo formatado
            'video': p.video_path
        } for p in players])
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# Endpoint para Limpar o Ranking
@app.route('/clear-ranking', methods=['DELETE'])
def clear_ranking():
    try:
        # Apaga todos os registros da tabela `players`
        session.query(Player).delete()
        session.commit()
        return jsonify({'message': 'Ranking limpo com sucesso!'}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# Endpoint para Limpar todos os Vídeos
@app.route('/clear-uploads', methods=['DELETE'])
def clear_uploads():
    try:
        # Deleta todos os vídeos na pasta 'uploads'
        for filename in os.listdir(UPLOAD_FOLDER):
            file_path = os.path.join(UPLOAD_FOLDER, filename)
            if os.path.isfile(file_path):
                os.remove(file_path)
        return jsonify({'message': 'Todos os vídeos foram apagados com sucesso!'}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
