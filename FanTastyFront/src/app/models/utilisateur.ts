export class Utilisateur {
  public id : string;
  public nom: string;
  public prenom: string;
  public email: string;
  public recetteFavoris: string[];
  public preferenceIngredients: string[];
  public roles: string[];
  private _token!: string | null;

  constructor(id: string, nom: string, prenom: string, email: string, recetteFavoris: string[], preferenceIngredients: string[], roles: string[]) {
    this.id = id;
    this.nom = nom;
    this.prenom = prenom;
    this.email = email;
    this.recetteFavoris = recetteFavoris;
    this.preferenceIngredients = preferenceIngredients;
    this.roles = roles;
  }

  public set token(token: string) {
    this._token = token;
  }

  public get token() {
    return this._token!;
  }
}
