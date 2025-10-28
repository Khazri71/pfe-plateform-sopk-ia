# Importation des bibliothèques nécessaires

from flask import Flask, request, jsonify , session
import requests
import pickle
import pandas as pd
import traceback  # Ajoute cette ligne pour l'importation de traceback
from bson import ObjectId
from pymongo import MongoClient
import os
from werkzeug.security import generate_password_hash , check_password_hash
from flask_cors import CORS




import jwt
# import datetime
from datetime import datetime, timedelta
from werkzeug.security import check_password_hash
from bson import ObjectId


import os
from dotenv import load_dotenv




# Les modéles ************************************************************

# Le Modéle de diagnostic du SOPK 
# with open ('SOPK/sopk_model_xgboost.pkl', 'rb' ) as file : 
#     sopk_model_xgboost = pickle.load(file)
with open ('SOPK/sopk_model_xgboost_top.pkl', 'rb' ) as file : 
    sopk_model_xgboost_top = pickle.load(file)



# Le Modéle de diagnostic de L'Hypothyroïdie 
with open ('maladies_similaires/hypothyroidie/hypothyroidie_model_xgboost.pkl', 'rb' ) as file : 
    hypothyroïdie_model_xgboost = pickle.load(file)

with open ('maladies_similaires/hypothyroidie/hypothyroidie_model_xgboost_top.pkl', 'rb' ) as file : 
    hypothyroidie_model_xgboost_top = pickle.load(file)
# Charger les encodeurs depuis le fichier pickle
with open('maladies_similaires/hypothyroidie/encodeurs.pkl', 'rb') as file:
    encodeurs_cats_hypothyroidie= pickle.load(file)


# le modéle de diagnostic de la Maladie rénale chronique
with open ('maladies_similaires/maladie_renale_chronique/maladie_renale_chronique_model_randomForest.pkl', 'rb' ) as file : 
    maladie_renale_chronique_model_randomForest = pickle.load(file)

with open ('maladies_similaires/maladie_renale_chronique/maladie_renale_chronique_model_randomForest_top.pkl', 'rb' ) as file : 
    maladie_renale_chronique_model_randomForest_top = pickle.load(file)
# Charger les encodeurs depuis le fichier pickle
with open('maladies_similaires/maladie_renale_chronique/encodeurs.pkl', 'rb') as file:
    encodeurs_cats_maladie_renale_chronique = pickle.load(file)






# le modéle de diagnostic de diabéte de type 2
with open ('maladies_similaires/diabete_de_type_2/diabete_type_2_model_xgboost.pkl', 'rb' ) as file : 
    diabete_type_2_model_xgboost = pickle.load(file)

with open ('maladies_similaires/diabete_de_type_2/diabete_type_2_model_xgboost_top.pkl', 'rb' ) as file : 
    diabete_type_2_model_xgboost_top = pickle.load(file)

# le modéle de diagnostic de cancer du sein
# with open ('Complications/Cancer du sein/cancer_sein_model_xgboost.pkl', 'rb' ) as file : 
#      cancer_sein_model_xgboost = pickle.load(file)

# le modéle de diagnostic de l'obésité
with open ('complications/obesite/obesite_model_gradientBoosting.pkl', 'rb' ) as file : 
    obesite_model_gradientBoosting = pickle.load(file)
with open ('complications/obesite/obesite_model_gradientBoosting_top.pkl', 'rb' ) as file : 
    obesite_model_gradientBoosting_top = pickle.load(file)
# Charger les encodeurs depuis le fichier pickle
with open('complications/obesite/encodeurs.pkl', 'rb') as file:
    encodeurs_cats_obesite = pickle.load(file)



# le modéle de diagnostic de cancer d'endométre
# with open ('complications/cancer_endometre/cancer_endometre_xgboost.pkl', 'rb' ) as file : 
#     cancer_endometre_xgboost = pickle.load(file)

with open ('complications/cancer_endometre/cancer_endometre_xgboost_top.pkl', 'rb' ) as file : 
    cancer_endometre_xgboost_top = pickle.load(file)


# le modéle de dépression et le vectorizer
# Charger les objets sauvegardés
# with open('model_passive_agressive.pkl', 'rb') as file:
#     passive_agg = pickle.load(file)

# with open('encodeurs.pkl', 'rb') as file:
#     encodeur = pickle.load(file)

# with open('tfidf.pkl', 'rb') as file:
#     tfidf = pickle.load(file)



#************************************************************************
# Se connecter à MongoDB
client = MongoClient('localhost', 27017)
db = client['Medical_db']
user_collection = db['users']
tests_collection = db["tests"]


# Création de l'application Flask
app = Flask(__name__)




# Blacklist
blacklist = set()
# Protéger un route avec token TOKEN REQUIRED DECORATOR ******************************************
from functools import wraps

def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        # Vérifier l'authentification avec le token dans le header
        auth_header = request.headers.get('Authorization')
        if not auth_header or not auth_header.startswith('Bearer '):
            return jsonify({'error': 'Token manquant'}), 401

        token = auth_header.split(' ')[1]

        # Vérifier si le token est dans la blacklist
        if token in blacklist:
            return jsonify({'error': 'Token invalidé'}), 401

        try:
            # Décoder le token pour obtenir l'ID de l'utilisateur
            decoded = jwt.decode(token, app.config['SECRET_KEY'], algorithms=['HS256'])
            request.user_id = decoded['user_id']  # Stocker l'ID de l'utilisateur dans la requête
        except jwt.ExpiredSignatureError:
            return jsonify({'error': 'Token expiré'}), 401
        except jwt.InvalidTokenError:
            return jsonify({'error': 'Token invalide'}), 401

        return f(*args, **kwargs)
    return decorated


# S'inscrire ************************************************************
@app.route('/register', methods=['POST'])
def register():
    # Récupérer les données de l'utilisateur depuis la requête POST
    data = request.json
    # Vérifier si les données de l'utilisateur sont complètes
    if 'username' not in data or 'email' not in data or 'password' not in data:
        return jsonify({'error': 'Nom utilisateur , Email et  Mot de passe sont requis'}), 400

    # Vérifier si l'email existe déjà dans la base de données
    existing_user = user_collection.find_one({'email': data['email']})

    if existing_user:
        return jsonify({'error': 'Email existe déjà'}), 400
        
    # Hacher le mot de passe avant de l'enregistrer dans la base de données
    hashed_password = generate_password_hash(data['password'])

    # Ajouter l'utilisateur à la collection des utilisateurs
    user_data = {
        'username': data['username'],
        'email': data['email'],
        'password': hashed_password
    }
    user_id = user_collection.insert_one(user_data).inserted_id
    return jsonify({'message': 'Inscription réussie', 'user_id': str(user_id)}), 201


#================================



@app.route('/login', methods=['POST'])
def login():
    data = request.json

    if 'email' not in data or 'password' not in data:
        return jsonify({'error': 'Email et mot de passe sont requis'}), 400

    user = user_collection.find_one({'email': data['email']})
    if not user:
        return jsonify({'error': "Aucun compte associé à cet email"}), 404

    if not check_password_hash(user['password'], data['password']):
        return jsonify({'error': "Mot de passe incorrect"}), 401
    
    if user and check_password_hash(user['password'], data['password']):
        # Créer un token JWT avec expiration
        token = jwt.encode({
            'user_id': str(user['_id']),  # Utiliser l'ID utilisateur existant
            'exp': datetime.now() + timedelta(hours=10)  # Expiration du token dans 10 heures
    }, app.config['SECRET_KEY'], algorithm='HS256')

    return jsonify({'message': 'Connexion réussie', 'token': token ,'user_id': str(user['_id']) , 'user_name': user['username'] ,  'user_email': user['email'] }), 200 




# Se deconnecter ************************************************************
# Liste pour stocker les tokens invalidés (optionnel si expiration automatique)
# blacklist = set()
# @app.route('/logout', methods=['POST'])
# def logout():
#     # Récupérer l'ID de l'utilisateur depuis *la requête
#     data = request.json
#     user_id = data.get('user_id')

#     if not user_id:
#         return jsonify({'error': 'ID utilisateur est requis'}), 400

#     # Ajouter l'ID de l'utilisateur à la liste noire
#     blacklist.add(user_id)

#     return jsonify({'message': 'Déconnexion réussie'}), 200


#===============

@app.route('/logout', methods=['POST'])
def logout():
    # Récupérer le token de la requête
    auth_header = request.headers.get('Authorization')
    if not auth_header or not auth_header.startswith('Bearer '):
        return jsonify({'error': 'Token manquant'}), 401

    token = auth_header.split(' ')[1]
    if token in blacklist:
        return jsonify({'error': 'Token déjà invalide'}), 401
    blacklist.add(token)  # Ajouter le token à la blacklist
    return jsonify({'message': 'Déconnexion réussie'}), 200
#####################################################################
# 1) pip install Flask-Mail
# 2) 
from flask_mail import Mail, Message

app.config['MAIL_SERVER'] = 'smtp.gmail.com'  # ou autre serveur SMTP
app.config['MAIL_PORT'] = 587
app.config['MAIL_USE_TLS'] = True
# app.config['MAIL_USERNAME'] = 'nourkhazri2@gmail.com'
# app.config['MAIL_PASSWORD'] = 'cgci bhwq aond qasy'  
# app.config['MAIL_DEFAULT_SENDER'] = 'nourkhazri2@gmail.com'

app.config['MAIL_USERNAME'] = 'sopkia.contact@gmail.com'
app.config['MAIL_PASSWORD'] = 'rbag zhoh jfwq mpqh'  
app.config['MAIL_DEFAULT_SENDER'] = 'sopkia.contact@gmail.com'


mail = Mail(app)

# 3) 
@app.route('/reset-link', methods=['POST'])
def reset_link():
    data = request.json
    email = data.get('email')

    if not email:
        return jsonify({'error': 'Email requis'}), 400

    user = user_collection.find_one({'email': email})
    if not user:
        return jsonify({'error': 'Utilisateur introuvable'}), 404

    reset_token = jwt.encode({
        'user_id': str(user['_id']),
        'exp': datetime.now() + timedelta(minutes=15)
    }, app.config['SECRET_KEY'], algorithm='HS256')

    reset_link = f"http://localhost:3000/reset-password?token={reset_token}"

    # Envoi de l'email
    try:
        msg = Message("Réinitialisation de mot de passe",
                      recipients=[email])
        
        
        # msg.body = 
        msg.html = f"""<html>
            <body>
                <p>Bonjour,</p>
                <p>Nous avons reçu une demande de réinitialisation de votre mot de passe.</p>
                <p>
                    Veuillez cliquer sur le lien ci-dessous pour définir un nouveau mot de passe :
                </p>
                <p>
                     <a href="{reset_link}" target="_blank">Réinitialiser mon mot de passe</a>
                </p>
                <p>Ce lien est valable pour une durée limitée (15 minutes).</p>
                <p>Si vous n’êtes pas à l’origine de cette demande, vous pouvez ignorer ce message.</p>
                <p>Cordialement,<br>SOPK IA</p>
            </body>
        </html>
        """
    
        mail.send(msg)
    except Exception as e:
        return jsonify({'error': 'Erreur lors de l’envoi de l’email', 'details': str(e)}), 500

    return jsonify({'message': 'Lien de réinitialisation envoyé par email' , 'reset_link': reset_link}), 200
 


# 2. Réinitialiser le mot de passe avec le token
# ================
@app.route('/reset-password', methods=['POST'])
def reset_password():
    data = request.json
    token = data.get('token')
    new_password = data.get('new_password')

    if not token or not new_password:
        return jsonify({'error': 'Token ou mot de passe manquant'}), 400

    try:
        decoded = jwt.decode(token, app.config['SECRET_KEY'], algorithms=['HS256'])
        user_id = decoded['user_id']

        # Mettre à jour le mot de passe dans MongoDB
        hashed_pw = generate_password_hash(new_password)
        result = user_collection.update_one(
            # {'_id': eval("ObjectId('" + user_id + "')")},
            {'_id': ObjectId(user_id)},
            {'$set': {'password': hashed_pw}}
        )

        if result.modified_count == 1:
            return jsonify({'message': 'Mot de passe mis à jour avec succès'}), 200
        else:
            return jsonify({'error': 'Échec de la mise à jour'}), 400

    except jwt.ExpiredSignatureError:
        return jsonify({'error': 'Token expiré'}), 400
    except jwt.InvalidTokenError:
        return jsonify({'error': 'Token invalide'}), 400

# ================










# Le diagnostic du SOPK ************************************************************

@app.route('/test_pcos/<user_id>', methods=['POST'])
@token_required
def test_sopk(user_id):
    # auth_header = request.headers.get('Authorization')
    # if not auth_header:
    #     return jsonify({'message': 'Token manquant'}), 401

    try:
        # Vérifier si des données ont été envoyées
        data = request.get_json()
        if not data:
            return jsonify({'error': 'Aucune donnée envoyée pour la prédiction'}), 400


        blood_group_mapping = {
            "A+": 11,
            "A-": 12,
            "B+": 13,
            "B-": 14,
            "O+": 15,
            "O-": 16,
            "AB+": 17,
            "AB-": 18
        }
        
        blood_group = data.get("Blood Group")
        blood_group_value = blood_group_mapping.get(blood_group)

        cycle_mapping = {
             "Régulier": 2 ,
             "Irrégulier" : 4
        }
       
        cycle = data.get("Cycle(R/I)")
        cycle_value = cycle_mapping.get(cycle)

        # Mettre à jour les valeurs dans data
        data["Blood Group"] = blood_group_value
        data["Cycle(R/I)"] = cycle_value


        # Champs booléens à convertir
        boolean_fields = [
            "Weight gain(Y/N)",
            "hair growth(Y/N)",
            "Skin darkening (Y/N)",
            "Hair loss(Y/N)",
            "Pimples(Y/N)",
            "Fast food (Y/N)",
            "Reg.Exercise(Y/N)",
            # "Pregnant(Y/N)"
        ]

        # Conversion Y/N -> 1/0
        for field in boolean_fields:
            value = data.get(field)
            if value == "Y":
                data[field] = 1
            elif value == "N":
                data[field] = 0



        # Vérifier si l'ID utilisateur est bien fourni dans l'URL
        if not user_id:
            return jsonify({'error': "ID utilisateur est requis dans l'URL"}), 400

        # Convertir user_id en ObjectId si nécessaire
        try:
            user_id = ObjectId(user_id)
        except Exception:
            return jsonify({'error': 'ID utilisateur invalide'}), 400

        # Récupérer l'utilisateur
        user = user_collection.find_one({'_id': user_id})
        if not user:
            return jsonify({'error': 'Utilisateur non trouvé'}), 404

        # # Convertir les données en DataFrame pour la prédiction
        test_data = pd.DataFrame([data])

        # Prédiction avec le modèle XGBoost
        resultat_pred = sopk_model_xgboost_top.predict(test_data)
        prediction_valeur = resultat_pred.tolist()

        # Anomalie prédite
        anomalie = 'SOPK' if prediction_valeur[0] == 1 else 'Non SOPK'

        # Création de l'objet test
        new_test = {
            'test_name' : "Test SOPK",
            'test_input': data,  # Données d'entrée envoyées par l'utilisateur
            'predicted_anomaly': anomalie,
            # 'prediction_result': prediction_valeur[0],
            'timestamp': pd.to_datetime('now').strftime('%Y-%m-%d %H:%M:%S'),
        }

        # Vérifier si l'utilisateur a déjà des tests enregistrés
        existing_tests = tests_collection.find_one({'user_id': str(user_id)})

        if existing_tests:
            # # S'il y a déjà des tests, ajouter le nouveau test avec un identifiant unique
            # test_count = len(existing_test["tests"]) + 1
            # test_key = f'test_data_{test_count}'
            # tests_collection.update_one(
            #     {'user_id': str(user_id)},
            #     {'$push': {'tests': {test_key: new_test}}}
            # )

                test_updated = False

                for i, test in enumerate(existing_tests['tests']):
                    key = list(test.keys())[0]
                    if test[key]['test_name'] == new_test['test_name']:
                        # Modifier le test existant
                        tests_collection.update_one(
                            {'user_id': str(user_id)},
                            {'$set': {f'tests.{i}.{key}': new_test}}
                        )
                        test_updated = True
                        break

                if not test_updated:
                    # Ajouter un nouveau test avec identifiant unique
                    test_count = len(existing_tests["tests"]) + 1
                    test_key = f'test_data_{test_count}'
                    tests_collection.update_one(
                        {'user_id': str(user_id)},
                        {'$push': {'tests': {test_key: new_test}}}
                    )

                    
        else:
            # Sinon, créer un nouveau document
            test_resultat = {
                'user_id': str(user_id),
                'username': user['username'],
                'tests': [{'test_data_1': new_test}]
            }
            tests_collection.insert_one(test_resultat)

        # Retourner la prédiction
        return jsonify({
            'prediction': prediction_valeur[0],
            'anomaly': anomalie,
            'message': 'Prédiction enregistrée avec succès'
        }), 200

    except Exception as e:
        print("Erreur lors de la prédiction :", str(e))
        traceback.print_exc()
        return jsonify({'error': str(e)}), 500
        









# Le diagnostic de l'obésité  ************************************************************
@app.route('/test_obesity/<user_id>', methods=['POST'])
@token_required
def test_obesite(user_id):
    # Liste des catégories d'obésité
    # OBESITY_CLASSES = [
    #      'Normal_Weight',
    #      'Overweight_Level_I',
    #      'Overweight_Level_II',
    #      'Obesity_Type_I',
    #      'Insufficient_Weight',
    #      'Obesity_Type_III'
    # ] 
    try:
        # Vérifier si des données ont été envoyées
        data = request.get_json()
        if not data:
            return jsonify({'error': 'Aucune donnée envoyée pour la prédiction'}), 400

# Champs booléens à convertir
        boolean_fields = [
             "family_history_with_overweight",
             "FAVC",
             "SMOKE",
             "SCC"
          
        ]

        many_fields = [
             "CAEC" ,
             "CALC"
        ]

        # Conversion   Y/N  ->  yes/no 
        for field in boolean_fields:
            value = data.get(field)
            if value == "Y":
                data[field] = "yes"
            elif value == "N":
                data[field] = "no"

         # Conversion   No ->  no 
        for field in many_fields:
            value = data.get(field)
            if value == "No":
                data[field] = "no"
           
   
        # Vérifier si l'ID utilisateur est bien fourni dans l'URL
        if not user_id:
            return jsonify({'error': "ID utilisateur est requis dans l'URL"}), 400

        # Convertir user_id en ObjectId si nécessaire
        try:
            user_id = ObjectId(user_id)
        except Exception:
            return jsonify({'error': 'ID utilisateur invalide'}), 400

        # Récupérer l'utilisateur
        user = user_collection.find_one({'_id': user_id})
        if not user:
            return jsonify({'error': 'Utilisateur non trouvé'}), 404

        # Convertir les données en DataFrame pour la prédiction
        test_data = pd.DataFrame([data])

          # Encodage des colonnes catégoriques avec les encodeurs chargés
        cat_cols = ['family_history_with_overweight', 'FAVC', 'CAEC', 'SMOKE', 'SCC', 'CALC', 'MTRANS']
        # cat_cols = ['FAVC', 'CALC',  'CAEC' , 'SCC']
        
        for col in cat_cols:
          if col in test_data.columns:
            try:
                 le = encodeurs_cats_obesite[col]
                 test_data[col] = le.transform(test_data[col].astype(str))
            except Exception as e:
                 print(f"Erreur lors de l'encodage de {col} : {e}")
          else:
                 print(f"Colonne {col} manquante dans les données")


      

        # Prédiction avec le modèle Gradient Boosting
        # resultat_pred = obesite_model_gradientBoosting.predict(test_data)
        # prediction_valeur = resultat_pred.tolist()


        
     # Prédiction avec le modèle
        # Prédiction avec le modèle
        resultat_pred_encoded = obesite_model_gradientBoosting.predict(test_data)  # [1 5 2 4 0 3]

# Décoder les résultats (les prédictions)
        resultat_pred = encodeurs_cats_obesite['Obesity_Level'].inverse_transform(resultat_pred_encoded)

# Ne pas convertir en int, garder sous forme de texte
        resultat_pred = resultat_pred[0]  # Garder sous forme de texte

# Anomalie prédite
        anomalie = resultat_pred
        print(anomalie)


        # # Effectuer la prédiction
        # resultat_pred_encoded = obesite_model_gradientBoosting.predict(test_data)
        # # Convertir l'indice de la prédiction en classe d'obésité
        # resultat_pred = OBESITY_CLASSES[prediction[0]]  # Utiliser l'indice pour trouver la catégorie


        

# Insufficient_Weight => 0
# Normal_Weight => 1
# Obesity_Type_I => 2
# Obesity_Type_III => 3
# Overweight_Level_I => 4
# Overweight_Level_II => 5


# Poids_Insuffisant => 0
# Poids_Normal => 1
# Obésité_Type_I => 2
# Obésité_Type_III => 3
# Surpoids_Niveau_I => 4
# Surpoids_Niveau_II => 5
       
        # if prediction_valeur[0] == 0:
        #    anomalie = 'Poids Insuffisant'
        # elif prediction_valeur[0] == 1:
        #    anomalie = 'Poids Normal'
        # elif prediction_valeur[0] == 2:
        #    anomalie = 'Obésité Type I'
        # elif prediction_valeur[0] == 3:
        #    anomalie = 'Obésité Type III '
        # elif prediction_valeur[0] == 4:
        #    anomalie = 'Surpoids Niveau I'
        # # elif prediction_valeur[0] == 5:
        # #    anomalie = 'Surpoids Niveau II'
        # else:
        #    anomalie = 'Surpoids_Niveau_II'

        # Création de l'objet test
        new_test = {
            'test_name' : "Test Obésité",
            'test_input': data,  # Données d'entrée envoyées par l'utilisateur
            'predicted_anomaly': anomalie,
            #'prediction_result': anomalie,
            'timestamp': pd.to_datetime('now').strftime('%Y-%m-%d %H:%M:%S'),
        }

        # Vérifier si l'utilisateur a déjà des tests enregistrés
        existing_tests = tests_collection.find_one({'user_id': str(user_id)})

        if existing_tests:
            # # S'il y a déjà des tests, ajouter le nouveau test avec un identifiant unique
            # test_count = len(existing_test["tests"]) + 1
            # test_key = f'test_data_{test_count}'
            # tests_collection.update_one(
            #     {'user_id': str(user_id)},
            #     {'$push': {'tests': {test_key: new_test}}}
            # )

            test_updated = False

            for i, test in enumerate(existing_tests['tests']):
                    key = list(test.keys())[0]
                    if test[key]['test_name'] == new_test['test_name']:
                        # Modifier le test existant
                        tests_collection.update_one(
                            {'user_id': str(user_id)},
                            {'$set': {f'tests.{i}.{key}': new_test}}
                        )
                        test_updated = True
                        break

            if not test_updated:
                    # Ajouter un nouveau test avec identifiant unique
                    test_count = len(existing_tests["tests"]) + 1
                    test_key = f'test_data_{test_count}'
                    tests_collection.update_one(
                        {'user_id': str(user_id)},
                        {'$push': {'tests': {test_key: new_test}}}
                    )
        else:
            # Sinon, créer un nouveau document
            test_resultat = {
                'user_id': str(user_id),
                'username': user['username'],
                'tests': [{'test_data_1': new_test}]
            }
            tests_collection.insert_one(test_resultat)

        # Retourner la prédiction
        return jsonify({
            # 'prediction': resultat_pred_encoded,
            'anomaly': anomalie,
            'message': 'Prédiction enregistrée avec succès'
        }), 200

    except Exception as e:
        print("Erreur lors de la prédiction :", str(e))
        traceback.print_exc()
        return jsonify({'error': str(e)}), 500









# Le diagnostic de la Maladie rénale chronique ************************************************************
@app.route('/test_endometrial-cancer/<user_id>', methods=['POST'])
@token_required
def test_cancer_endometre(user_id):
    try:
        # Vérifier si des données ont été envoyées
        data = request.get_json()
        if not data:
            return jsonify({'error': 'Aucune donnée envoyée pour la prédiction'}), 400

            # Champs booléens à convertir
        boolean_fields = [
    "Menstrual pain (Dysmenorrhea)",
    "Painful cramps during period",
    "Cramping",
    "Ovarian cysts",
    "Heavy / Extreme menstrual bleeding",
    "Fatigue / Chronic fatigue",
    "Painful / Burning pain during sex (Dyspareunia)",
    "Pelvic pain",
    "IBS-like symptoms",
    "Infertility",
    "Fever",
    "Constipation / Chronic constipation",
    "Irregular / Missed periods",
    "Bloating",
    "Hormonal problems",
    "Extreme / Severe pain",
    "Cysts (unspecified)",
    "Abdominal pain / pressure",
    "Excessive bleeding",
    "Bowel pain",
    "Painful bowel movements",
    "Migraines",
    "Loss of appetite",
    "Menstrual clots",
    "Lower back pain",
    "Vaginal Pain/Pressure",
    "Back pain",
    "Painful ovulation",
    "Decreased energy / Exhaustion",
    "Long menstruation"
]


        # Conversion Y/N -> 1/0
        for field in boolean_fields:
            value = data.get(field)
            if value == "Y":
                data[field] = 1
            elif value == "N":
                data[field] = 0




        # Vérifier si l'ID utilisateur est bien fourni dans l'URL
        if not user_id:
            return jsonify({'error': "ID utilisateur est requis dans l'URL"}), 400

        # Convertir user_id en ObjectId si nécessaire
        try:
            user_id = ObjectId(user_id)
        except Exception:
            return jsonify({'error': 'ID utilisateur invalide'}), 400

        # Récupérer l'utilisateur
        user = user_collection.find_one({'_id': user_id})
        if not user:
            return jsonify({'error': 'Utilisateur non trouvé'}), 404

        # Convertir les données en DataFrame pour la prédiction
        test_data = pd.DataFrame([data])

        # Prédiction avec le modèle XGBoost
        resultat_pred = cancer_endometre_xgboost_top.predict(test_data)
        prediction_valeur = resultat_pred.tolist()

        
        # Anomalie prédite
        anomalie = 'Cancer d\'endométre' if prediction_valeur[0] == 1 else 'Non Cancer d\'endométre'


        # Création de l'objet test
        new_test = {
            'test_name' : "Test Cancer d'Endométre",
            'test_input': data,  # Données d'entrée envoyées par l'utilisateur
            'predicted_anomaly': anomalie,
            # 'prediction_result': prediction_valeur[0],
            'timestamp': pd.to_datetime('now').strftime('%Y-%m-%d %H:%M:%S'),
        }

        # Vérifier si l'utilisateur a déjà des tests enregistrés
        existing_tests = tests_collection.find_one({'user_id': str(user_id)})

        if existing_tests:
            # S'il y a déjà des tests, ajouter le nouveau test avec un identifiant unique
            # test_count = len(existing_test["tests"]) + 1
            # test_key = f'test_data_{test_count}'
            # tests_collection.update_one(
            #     {'user_id': str(user_id)},
            #     {'$push': {'tests': {test_key: new_test}}}
            # )
            test_updated = False

            for i, test in enumerate(existing_tests['tests']):
                    key = list(test.keys())[0]
                    if test[key]['test_name'] == new_test['test_name']:
                        # Modifier le test existant
                        tests_collection.update_one(
                            {'user_id': str(user_id)},
                            {'$set': {f'tests.{i}.{key}': new_test}}
                        )
                        test_updated = True
                        break

            if not test_updated:
                    # Ajouter un nouveau test avec identifiant unique
                    test_count = len(existing_tests["tests"]) + 1
                    test_key = f'test_data_{test_count}'
                    tests_collection.update_one(
                        {'user_id': str(user_id)},
                        {'$push': {'tests': {test_key: new_test}}}
                    )
        else:
            # Sinon, créer un nouveau document
            test_resultat = {
                'user_id': str(user_id),
                'username': user['username'],
                'tests': [{'test_data_1': new_test}]
            }
            tests_collection.insert_one(test_resultat)

        # Retourner la prédiction
        return jsonify({
            'prediction': prediction_valeur[0],
            'anomaly': anomalie,
            'message': 'Prédiction enregistrée avec succès'
        }), 200

    except Exception as e:
        print("Erreur lors de la prédiction :", str(e))
        traceback.print_exc()
        return jsonify({'error': str(e)}), 500



# Echographie ****************************************************************
from tensorflow.keras.models import load_model
from werkzeug.utils import secure_filename
import cv2
import numpy as np
from datetime import datetime




# 1. Charger le modèle .h5
# model = load_model('my_model.keras')
model_echo = load_model('sopk_echographie/model_echo_sopk.keras')

uploads_dir = os.path.join(app.instance_path, 'uploads')
if not os.path.exists(uploads_dir):
    os.makedirs(uploads_dir)
app.config['uploads'] = uploads_dir
def preprocess_image(image_path):
    # Load the image using OpenCV
    img = cv2.imread(image_path)
    # Check if the image was loaded successfully
    if img is None:
        print(f"Error loading image at path: {image_path}")
        return None
    # Convert BGR to RGB
    img_rgb = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
    # Resize the image to 150x150
    # img_resized = cv2.resize(img_rgb, (150, 150))
    img_resized = cv2.resize(img_rgb, (224, 224))
    # Normalize the pixel values to [0, 1]
    img_normalized = img_resized / 255.0
    # Add batch dimension
    img_reshaped = np.expand_dims(img_normalized, axis=0)  # Shape: (1, 150, 150, 3)
    return img_reshaped
@app.route('/test_pcos_echo/<user_id>', methods=['POST'])
@token_required
def test_sopk_echo(user_id):
    if not user_id:
        return jsonify({'error': "ID utilisateur est requis dans l'URL"}), 400

    try:
        user_id = ObjectId(user_id)
    except Exception:
        return jsonify({'error': 'ID utilisateur invalide'}), 400

    user = user_collection.find_one({'_id': user_id})
    if not user:
        return jsonify({'error': 'Utilisateur non trouvé'}), 404

    data = request.form.to_dict()

    try:
        if 'image' not in request.files:
            return jsonify({"error": "No image file found"}), 400
        image_file = request.files['image']
        if image_file.filename == '':
            return jsonify({"error": "No image selected"}), 400

        filename = secure_filename(image_file.filename)
        image_path = os.path.join(app.config['uploads'], filename)
        image_file.save(image_path)

        image_reshaped = preprocess_image(image_path)
        if image_reshaped is None:
            return jsonify({"error": "Error preprocessing the image"}), 400

        prediction = model_echo.predict(image_reshaped)[0][0]
        probability = float(prediction)
        class_prediction = "L'ovaire est sain" if probability >= 0.5 else "L'ovaire est infecté" 

        # Création de l'objet test
        new_test = {
            "test_name": "Test Echographique SOPK",
            # "test_input": data,
            "predicted_class": class_prediction,
            "probability": probability,
            "image_path": image_path,
            "timestamp": datetime.utcnow().strftime('%Y-%m-%d %H:%M:%S'),
        }

        # Vérifier si l'utilisateur a déjà des tests enregistrés
        existing_tests = tests_collection.find_one({'user_id': str(user_id)})

        if existing_tests:
            # Ajouter un test avec un identifiant unique
            # test_count = len(existing_test["tests"]) + 1
            # test_key = f'test_data_{test_count}'
            # tests_collection.update_one(
            #     {'user_id': str(user_id)},
            #     {'$push': {'tests': {test_key: new_test}}}
            # )
            test_updated = False

            for i, test in enumerate(existing_tests['tests']):
                    key = list(test.keys())[0]
                    if test[key]['test_name'] == new_test['test_name']:
                        # Modifier le test existant
                        tests_collection.update_one(
                            {'user_id': str(user_id)},
                            {'$set': {f'tests.{i}.{key}': new_test}}
                        )
                        test_updated = True
                        break

            if not test_updated:
                    # Ajouter un nouveau test avec identifiant unique
                    test_count = len(existing_tests["tests"]) + 1
                    test_key = f'test_data_{test_count}'
                    tests_collection.update_one(
                        {'user_id': str(user_id)},
                        {'$push': {'tests': {test_key: new_test}}}
                    )
        else:
            # Créer un nouveau document
            test_resultat = {
                'user_id': str(user_id),
                'username': user['username'],
                'tests': [{'test_data_1': new_test}]
            }
            tests_collection.insert_one(test_resultat)

        os.remove(image_path)

        return jsonify({
            "prediction": class_prediction,
            "probability": probability,
            "message": "Prédiction enregistrée avec succès"
        }), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500
























# Les Régimes ( SOPK / SOPK + Obésité / ***********************************************************************
# For PCOS (SOPK) Alone
# :lien: /generate_meal_plan?condition=Primal
#  Le régime Primal (similaire au paléo) est souvent recommandé pour le SOPK car il limite les aliments transformés, le sucre raffiné et les glucides à indice glycémique élevé

# For PCOS + Obesity
# :lien: /generate_meal_plan?condition=ketogenic,Primal
# L'ajout de ketogenic est pertinent pour aider à perdre du poids et à réguler l'insuline, ce qui est souvent utile pour les personnes souffrant à la fois de SOPK et d'obésité


# For Type 2 Diabetes (Similar to PCOS)
# :lien: /generate_meal_plan?condition=low_glycemic,Mediterranean
# Low Glycemic Index (low_glycemic)
#    - Se concentre sur les aliments qui n’augmentent pas trop la glycémie.
#    - Moins restrictif que le keto, plus facile à maintenir.

# Mediterranean
#    - Riche en fibres, légumes, bonnes graisses (huile d’olive, poisson).
#    - Recommandé par l’OMS pour les diabétiques.



###################################


# For PCOS (SOPK) Alone
# :lien: /generate_meal_plan?condition=Primal

# For PCOS + Cancer (Endometrial)
# :lien: /generate_meal_plan?condition=Primal,balanced


# For PCOS + Obesity
# :lien: /generate_meal_plan?condition=ketogenic,Primal


# For PCOS + Depression
# :lien: /generate_meal_plan?condition=balanced,pescetarian

# ----

# For Hypothyroidism (Similar to PCOS)
# :lien: /generate_meal_plan?condition=Primal,balanced

# For Type 2 Diabetes (Similar to PCOS)
# :lien: /generate_meal_plan?condition=ketogenic,Primal,balanced

# For Mak=ladie renale chronique (Similar to PCOS)
# :lien: /generate_meal_plan?condition=low-protein,low-potassium,low-phosphorus

# -----
# For General Health Optimization (If No Disease is Detected)
# :lien: /generate_meal_plan?condition=balanced,pescetarian,mediterranean





# API_KEY = "bb5fa9ff29ed4bf5b33a904a718088a3"
# API_KEY = "670f3b02aeb149ebbf325784838cd311"
API_KEY = "aaabe514284e4c3588f050fdfd240e10"


def get_meal_plan(diet_type):
    url = f"https://api.spoonacular.com/mealplanner/generate?timeFrame=week&targetCalories=2000&diet={diet_type}&exclude=shellfish,olives&apiKey={API_KEY}"
    response = requests.get(url)
    if response.status_code == 200:
        return response.json()
    else:
        return {"error": "Failed to retrieve meal plan from Spoonacular."}

@app.route('/generate_meal_plan/<diet_type>', methods=['GET'])
def generate_meal_plan(diet_type):
    if not diet_type:
        return jsonify({"error": "No diet type provided."}), 400

    meal_plan = get_meal_plan(diet_type)
    return jsonify(meal_plan)



# @app.route('/get_test/<user_id>', methods=['GET'])
# def get_test(user_id):
#     user = user_collection.find_one({'_id': user_id})
#     if not user:
#         return jsonify({'error': 'Utilisateur non trouvé'}), 404
#     # Vérifier si l'utilisateur a déjà des tests enregistrés
#         existing_tests = tests_collection.find_one({'user_id': str(user_id)})
#         if (existing_tests)
#         for i, test in enumerate(existing_tests['tests']):
#                     key = list(test.keys())[0]
#                      for i, test in enumerate(existing_tests['tests']):
#                     if test[key]['test_input']['Age']:





# Fonction utilitaire pour récupérer la première valeur disponible dans une liste de clés
def get_first_available(data_dict, keys, default=''):
    for key in keys:
        if key in data_dict:
            return data_dict[key]
    return default

                    
@app.route('/api/first_valid_test_metrics/<user_id>', methods=['GET'])
def get_first_valid_test_metrics(user_id):
    try:
        if not user_id:
            return jsonify({
                'success': False,
                'status': 400,
                'message': 'User ID not provided',
                'data': None
            }), 400

        # Récupérer les tests pour l'utilisateur spécifié
        user_data = tests_collection.find_one({"user_id": str(user_id)})
        
        if not user_data or 'tests' not in user_data:
            return jsonify({
                'success': False,
                'status': 404,
                'message': 'No test records found for the given user ID',
                'data': None
            }), 404

        # Parcourir les tests pour trouver la première valeur valide
        for test in user_data['tests']:
            for key, value in test.items():
                test_name = value.get('test_name', 'Unknown Test')
                test_input = value.get('test_input', {})

                # Récupérer l'âge, la largeur et la hauteur si disponibles
                # age = test_input.get('Age (yrs)', test_input.get('Age', 'N/A'))
                # width = test_input.get('Width', test_input.get('Hip(inch)', 'N/A'))
                # height = test_input.get('Height', test_input.get('Avg. F size (L) (mm)', 'N/A'))
                age = get_first_available(test_input, ['Age (yrs)', 'Age', 'age'])
                weight = get_first_available(test_input, ['weight', 'Weight', 'Weight (Kg)'])
                height = get_first_available(test_input, ['Height', 'height'])

                # Vérifier si toutes les valeurs sont valides
                if age != '' or width != '' or height != '':
                    return jsonify({
                        'success': True,
                        'status': 200,
                        'message': 'First valid test metrics found',
                        'data': {
                            'test_name': test_name,
                            'age': age,
                            'weight': weight,
                            'height': height
                        }
                    }), 200

        # Si aucun test valide n'est trouvé
        return jsonify({
            'success': False,
            'status': 404,
            'message': 'No valid test metrics found',
            'data': {
                'age': '',
                'weight': '',
                'height': ''
            }
        }), 404

    except Exception as e:
        return jsonify({
            'success': False,
            'status': 500,
            'message': 'Error while fetching first valid test metrics',
            'data': str(e)}),500















































# La Dépression ***************************************************
from flask import Flask, request, jsonify
from flask_cors import CORS
from datetime import datetime
import nltk
from nltk.stem import WordNetLemmatizer
import re




CORS(app)  # Autorise les requêtes cross-origin

#------------------------------- Charger les modèles

with open("complications/depression/model_passive_agressive.pkl", "rb") as file:
    model = pickle.load(file)
with open("complications/depression/tfidf.pkl", "rb") as file:
    tfidf = pickle.load(file)
with open('complications/depression/encodeurs.pkl', 'rb') as file:
    encodeur = pickle.load(file)

# with open('Complications/Depression/encodeurs.pkl', 'rb') as file:
#     encodeur = pickle.load(file)
# with open("Passive_aggressive_model.pkl", "rb") as file:
#     model = pickle.load(file)
# with open("countvectorizer.pkl", "rb") as file:
#     tfidf = pickle.load(file)


#------------------------------- Initialiser les variables globales et Définir Les Fonctions

you = []  # Liste pour stocker les réponses de l'utilisateur
bot = []  # Liste pour stocker les réponses du chatbot
time = []  # Liste pour l'heure des réponses
questions = [
    "How have you been feeling lately?",
    # "Hello, I am a health care chatbot that helps you predict your depression. Write down your thoughts and your feelings so I can help you?",
    "Write down your thoughts and your feelings so I can help you?",
    "Can you tell me about something that's been on your mind recently?",
    "What are some things that bring you joy or make you feel down?",
    "Have you noticed any changes in your mood or energy levels lately?",
    "Is there anything you're struggling with that you'd like to talk about?",
    "What do you do when you're feeling overwhelmed or stressed?",
    "How would you describe your overall mood right now?"
]


# Fonction de prétraitement
def preprocess(symptoms):
    words = symptoms.split()
    lemmatizer = WordNetLemmatizer()
    lemmas = [lemmatizer.lemmatize(word) for word in words]
    return " ".join(lemmas)

# Define a function to postprocess the output disease
def postprocess(disease):
    # Capitalize the first letter of each word
    # out = disease.title()
    if out == "Negative" : 
        out = "Déprimé"
    if out == "Positive" : 
        out = "Non Déprimé"
    return  out 


# ------------------------------- Les salutations
# Liste de salutations
greetings = [
    # (r"hi|hello|hey", ["Hello, I am a health care chatbot that helps you predict your depression. Write down your thoughts and your feelings so I can help you?", "Hey, I am a health care chatbot. How can I help you?"]),
     (r"hi|hello|hey", ["Hey, I am a health care chatbot. How can I help you?"]),
    (r"how are you|how do you do", ["I am fine, thank you.", "I am doing well, thank you.", "I am good, thank you."]),
    (r"what is your name|who are you", ["I am a health care chatbot.", "My name is Depresso.", "I am Depresso, a health care chatbot."]),
    (r"you are amazing|you are awesome|you are great", ["Thank you for your kind words.", "You are too kind.", "You made my day."]),
    (r"thank you|thanks|thankyou", ["You are welcome.", "It's my pleasure.", "No problem, at any time."]),
    (r"bye|goodbye|see you", ["Bye for now.", "Goodbye, take care.", "See you soon."])
]
# Créer un objet greetbot
greetbot = nltk.chat.util.Chat(greetings)
# # Fonction pour vérifier si l'entrée est une salutation
# def is_greeting(input_symptoms):
#     return greetbot.respond(input_symptoms.lower()) is not None
# # Fonction pour générer une réponse de salutation
# def get_greeting_response(input_symptoms):
#     return greetbot.respond(input_symptoms.lower())

# Vérifie si c'est une salutation
def is_greeting(text):
    return greetbot.respond(text) is not None

# Retourne la réponse du bot
def get_greeting_response(text):
    return greetbot.respond(text)





# Le diagnostic de Dépression ************************************************************
# Endpoint pour gérer les requêtes POST et GET
@app.route('/chatbot/<user_id>', methods=["POST"])
@token_required
def chatbot(user_id):
    
    try:

        current_time = datetime.now().strftime("%H:%M")
        data = request.get_json()
        input_symptoms = data.get('message', '').strip()


        if not data:
            return jsonify({'error': 'Aucune donnée envoyée pour la prédiction'}), 400

        # Vérifier si l'ID utilisateur est bien fourni dans l'URL
        if not user_id:
            return jsonify({'error': "ID utilisateur est requis dans l'URL"}), 400

        # Convertir user_id en ObjectId si nécessaire
        try:
            user_id = ObjectId(user_id)
        except Exception:
            return jsonify({'error': 'ID utilisateur invalide'}), 400

        # Récupérer l'utilisateur
        # Récupérer l'utilisateur
        user = user_collection.find_one({'_id': user_id})
        if not user:
            return jsonify({'error': 'Utilisateur non trouvé'}), 404
        
         # Vérifie si c'est une salutation
       

        if is_greeting(input_symptoms):
            greeting_response = get_greeting_response(input_symptoms)
            return jsonify({'response': greeting_response, 'time': current_time})

       
        # if input_symptoms :
        
            you.append(input_symptoms)
            time.append(current_time)
            # Check if all questions have been asked
            if len(you) < len(questions):
                # Ask the next question
                output = questions[len(you)]
                
            else:
                # Après que l'utilisateur ait répondu à toutes les questions
                combined_input = ' '.join(you)  # Combiner toutes les réponses de l'utilisateur
                processed_input = preprocess(combined_input)  # Prétraiter les données de l'utilisateur
                input_vector = tfidf.transform([processed_input])  # Transformer l'input avec le vectorizer
            
                # Prédire la maladie avec le modèle
                output_disease = model.predict(input_vector)[0]
                # output = encodeur.inverse_transform([output_disease])[0] 
                # Postprocess the output disease
                output = postprocess(output_disease)

                

                # Création de l'objet test
                new_test = {
                       'test_name' : "Test de Dépression",
                       'prediction_result': output,
                       'timestamp': current_time,
                }

                
                # Vérifier si l'utilisateur a déjà des tests enregistrés
                existing_tests = tests_collection.find_one({'user_id': str(user_id)})

                if existing_tests:
                # S'il y a déjà des tests, ajouter le nouveau test avec un identifiant unique
                    # test_count = len(existing_test["tests"]) + 1
                    # test_key = f'test_data_{test_count}'
                    # tests_collection.update_one(
                    #     {'user_id': str(user_id)},
                    #     {'$push': {'tests': {test_key: new_test}}}
                    # )
                    test_updated = False

                    for i, test in enumerate(existing_tests['tests']):
                        key = list(test.keys())[0]
                        if test[key]['test_name'] == new_test['test_name']:
                            # Modifier le test existant
                            tests_collection.update_one(
                                {'user_id': str(user_id)},
                                {'$set': {f'tests.{i}.{key}': new_test}}
                            )
                            test_updated = True
                            break

                    if not test_updated:
                        # Ajouter un nouveau test avec identifiant unique
                        test_count = len(existing_tests["tests"]) + 1
                        test_key = f'test_data_{test_count}'
                        tests_collection.update_one(
                            {'user_id': str(user_id)},
                            {'$push': {'tests': {test_key: new_test}}}
                        )
                else:
                    # Sinon, créer un nouveau document
                    test_resultat = {
                        'user_id': str(user_id),
                        'username': user['username'],
                        'tests': [{'test_data_1': new_test}]
                    }
                    tests_collection.insert_one(test_resultat)
                    time.append(current_time)
                

                # Ajouter la prédiction à la liste des réponses du bot et enregistrer l'heure
                # bot.append(f"The predicted output is: {output}")
                # time.append(current_time)
               


            # Retourner la prédiction
            return jsonify({
                'response': output,
                'time': current_time
            })


               # return jsonify({'response': output , 'time': current_time}) 
               # return jsonify({'response': 'Veuillez entrer un message.'}), 400

    except Exception as e:
        return jsonify({"error": str(e)}), 500






# ===============================
# ------------------------------- Route principale POST
@app.route('/chatbot_depression/<user_id>', methods=["POST"])
@token_required
def chatbot_depression(user_id):
    try:
        current_time = datetime.now().strftime("%H:%M")
        data = request.get_json()
        input_symptoms = data.get('message', '').strip()
        isFinal = False

        if not data:
            return jsonify({'error': 'Aucune donnée envoyée pour la prédiction'}), 400

        if not user_id:
            return jsonify({'error': "ID utilisateur est requis dans l'URL"}), 400

        try:
            user_id = ObjectId(user_id)
        except Exception:
            return jsonify({'error': 'ID utilisateur invalide'}), 400

        user = user_collection.find_one({'_id': user_id})
        if not user:
            return jsonify({'error': 'Utilisateur non trouvé'}), 404

        # Vérifie si c'est une salutation, et n'ajoute rien aux listes si c'est le cas
        if is_greeting(input_symptoms):
            greeting_response = get_greeting_response(input_symptoms)
            return jsonify({'response': greeting_response, 'time': current_time})

        # Sinon, continuer avec le test de dépression
        # you.append(input_symptoms)
        # time.append(current_time)
        current_index = len(you)


        # if len(you) < len(questions):
        #     output = questions[len(you)]
        if current_index < len(questions):
            you.append(input_symptoms)
            time.append(current_time)
            output = questions[current_index]
        else:
            combined_input = ' '.join(you)
            processed_input = preprocess(combined_input)
            input_vector = tfidf.transform([processed_input])
            output_disease = model.predict(input_vector)[0]
            # output = postprocess(output_disease)
            # output = int(output_disease)
            # output = encodeur.inverse_transform(output_disease)
            output = encodeur.inverse_transform([output_disease])[0]
            isFinal = True




            new_test = {
                'test_name': "Test de Dépression",
                'prediction_result': output ,
                'timestamp': current_time
            }

            existing_tests = tests_collection.find_one({'user_id': str(user_id)})
            if existing_tests:
                test_updated = False
                for i, test in enumerate(existing_tests['tests']):
                    key = list(test.keys())[0]
                    if test[key]['test_name'] == new_test['test_name']:
                        tests_collection.update_one(
                            {'user_id': str(user_id)},
                            {'$set': {f'tests.{i}.{key}': new_test}}
                        )
                        test_updated = True
                        break

                if not test_updated:
                    test_count = len(existing_tests["tests"]) + 1
                    test_key = f'test_data_{test_count}'
                    tests_collection.update_one(
                        {'user_id': str(user_id)},
                        {'$push': {'tests': {test_key: new_test}}}
                    )
            else:
                test_resultat = {
                    'user_id': str(user_id),
                    'username': user['username'],
                    'tests': [{'test_data_1': new_test}]
                }
                tests_collection.insert_one(test_resultat)

        return jsonify({'response': output , 'time': current_time, 'isFinal':isFinal })

    except Exception as e:
        return jsonify({"error": str(e)}), 500


# ===============================


@app.route('/chatbot/<user_id>', methods=["GET"])
def reset_chat(user_id):
    you.clear()
    bot.clear()
    time.clear()
    return jsonify({"status": "chat reset"}), 200







if __name__ == "__main__":
    app.run(port=5000, debug=True)