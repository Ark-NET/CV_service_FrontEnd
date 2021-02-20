export class DisposalBasket {
  public education: number[] = []
  public links: number[] = []
  public jobs: number[] = []

  public addTOBasket_education(id: number): void {
    this.education.push(id);
  }

  public addTOBasket_links(id: number): void {
    this.links.push(id);
  }

  public addTOBasket_jobs(id: number): void {
    this.jobs.push(id);
  }
}
