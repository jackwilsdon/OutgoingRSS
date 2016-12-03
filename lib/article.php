<?php

/**
 * Represents an immutable article with a title, date, description and link.
 */
final class Article implements JsonSerializable {
  private $title;
  private $date;
  private $description;
  private $link;

  /**
   * Constructs a new immutable article with the specified values.
   *
   * @param string $title the title for the article
   * @param string $date the publication date for the article
   * @param string $description the description for the article
   * @param string $link the link for the article
   */
  public function __construct($title, $date, $description, $link) {
    $this->title = $title;
    $this->date = $date;
    $this->description = $description;
    $this->link = $link;
  }

  /**
   * Returns the title of the article.
   *
   * @return string the title of the article
   */
  public function getTitle() {
    return $this->title;
  }

  /**
   * Returns the publication date of the article.
   *
   * @return string the publication date of the article
   */
  public function getDate() {
    return $this->date;
  }

  /**
   * Returns the description of the article.
   *
   * @return string the description of the article
   */
  public function getDescription() {
    return $this->description;
  }

  /**
   * Returns the link of the article.
   *
   * @return string the link of the article
   */
  public function getLink() {
    return $this->link;
  }

  /**
   * Returns the data that should be used when serializing the article.
   *
   * @return object the data that should be used when serializing the article
   */
  public function jsonSerialize() {
    return (object) array(
      'title' => $this->title,
      'date' => $this->date,
      'description' => $this->description,
      'link' => $this->link,
    );
  }
}
